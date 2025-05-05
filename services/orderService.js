// services/orderService.js
import { supabase } from "../lib/supabase";
import { v4 as uuidv4 } from "uuid"; // Untuk generate ID unik
import { generateTimeBasedId } from "../lib/generateId";

export async function getMenuItems() {
  const { data, error } = await supabase.from("menu").select("*");
  if (error) throw error;
  return data;
}

export const getOrderItems = async () => {
  const { data, error } = await supabase.from("order_items").select("*");
  if (error) throw error;
  return data;
};

export const getOrders = async (startDate, endDate) => {
  let query = supabase.from("orders").select(`
    *, 
    order_items(*)
  `);

  // Tambahkan filter rentang tanggal jika tersedia
  if (startDate && endDate) {
    query = query.gte("created_at", startDate).lte("created_at", endDate);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) throw error;

  // Hitung total pendapatan dari order_items
  const totalIncome = data?.reduce((acc, order) => {
    const orderTotal = order.order_items?.reduce((sum, item) => sum + (item.total_price || 0), 0);
    return acc + orderTotal;
  }, 0);

  return {
    orders: data,
    totalIncome,
  };
};

export const createOrder = async ({ orders, totalOrderPrice, outlet, kasir, payment_type }) => {
  // const { orders, totalOrderPrice } = useOrderStore.getState();

  if (orders.length === 0) {
    console.warn("Tidak ada item dalam pesanan.");
    return;
  }

  const orderNumber = generateTimeBasedId();

  const orderData = {
    id: generateTimeBasedId(),
    order_number: orderNumber,
    total_price: totalOrderPrice,
    payment_type: payment_type,
    notes: "",
    status: "",
    kasir: kasir,
    outlet: outlet,
  };

  try {
    // Insert ke tabel 'orders'
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([orderData])
      .select();

    if (orderError) throw orderError;

    // Mapping ke format tabel 'order_items'
    const orderItems = orders.map((item) => ({
      id: generateTimeBasedId(),
      order_id: order[0].id,
      product_id: item.product_id,
      product_name: item.name, // kolomnya adalah 'product_name'
      base_price: item.base_price,
      variant_type: item.variant_type_name, // kolomnya adalah 'variant_type'
      variant_name: item.variant_value, // kolomnya adalah 'variant_name'
      variant_price: item.variant_extra_price, // kolomnya adalah 'variant_price'
      quantity: item.quantity,
      total_price: item.total_price,
      note: item.note,
    }));

    const { data: orderItemsData, error: orderItemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (orderItemsError) throw orderItemsError;

    console.log("Pesanan dan item pesanan berhasil dibuat:", { order, orderItemsData });

    return { order, orderItemsData };
  } catch (error) {
    console.error("Gagal membuat pesanan:", error);
  }
};

export const deleteOrder = async (id) => {
  try {
    const { data, error } = await supabase.from("orders").update({ is_active: false }).eq("id", id);
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
