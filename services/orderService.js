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

export const getOrders = async () => {
  const { data, error } = await supabase.from("orders").select(`
      *,
      order_items(*)
    `);

  if (error) throw error;
  return data;
};

export const createOrder = async (orders, totalOrderPrice) => {
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
    payment_type: "cash",
    notes: "",
    status: "",
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
