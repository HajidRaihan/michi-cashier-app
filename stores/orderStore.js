import { create } from "zustand";
import { getOrders } from "../services/orderService";

export const useOrderStore = create((set) => ({
  orders: [],
  totalOrderPrice: 0, // total keseluruhan

  //   addToOrder: ({ product_id, name, base_price, variant, quantity, total_price }) => {
  //     const orderItem = {
  //       product_id,
  //       name,
  //       base_price,
  //       variant_id: variant?.id,
  //       variant_type: variant?.variant_type,
  //       variant_value: variant?.variant_value,
  //       variant_extra_price: variant?.extra_price || 0,
  //       quantity,
  //       total_price,
  //     };

  //     set((state) => {
  //       const updatedOrders = [...state.orders, orderItem];
  //       const newTotal = updatedOrders.reduce((sum, item) => sum + item.total_price, 0);

  //       return {
  //         orders: updatedOrders,
  //         totalOrderPrice: newTotal,
  //       };
  //     });
  //   },

  addToOrder: ({
    product_id,
    name,
    base_price,
    variant_type,
    variant,
    quantity,
    total_price,
    note,
  }) => {
    const variant_value = variant?.optionValue || "";
    const variant_extra_price = variant?.extraPrice || 0;
    const variant_type_name = variant_type || "";

    set((state) => {
      const existingOrderIndex = state.orders.findIndex(
        (item) => item.product_id === product_id && item.variant_value === variant_value // cocokkan dengan optionValue
      );

      let updatedOrders;

      if (existingOrderIndex !== -1) {
        // Update existing item
        updatedOrders = state.orders.map((item, index) => {
          if (index === existingOrderIndex) {
            const newQuantity = item.quantity + quantity;
            const newTotalPrice = (item.base_price + item.variant_extra_price) * newQuantity;

            return {
              ...item,
              quantity: newQuantity,
              total_price: newTotalPrice,
            };
          }
          return item;
        });
      } else {
        // Add new item
        const orderItem = {
          product_id,
          name,
          base_price,
          variant_value,
          variant_extra_price,
          variant_type_name,
          quantity,
          total_price,
          note,
        };
        updatedOrders = [...state.orders, orderItem];
      }

      const newTotal = updatedOrders.reduce((sum, item) => sum + item.total_price, 0);

      return {
        orders: updatedOrders,
        totalOrderPrice: newTotal,
      };
    });
  },

  removeFromOrder: (product_id, variant_value) =>
    set((state) => {
      const filteredOrders = state.orders.filter(
        (item) => item.product_id !== product_id || item.variant_value !== variant_value
      );

      const newTotal = filteredOrders.reduce((sum, item) => sum + item.total_price, 0);

      return {
        orders: filteredOrders,
        totalOrderPrice: newTotal,
      };
    }),
  updateQuantity: (product_id, variant_id, newQty) =>
    set((state) => ({
      orders: state.orders.map((item) => {
        if (item.product_id === product_id && item.variant_id === variant_id) {
          const variantExtra = item.variant_extra_price || 0;
          const total_price = (item.base_price + variantExtra) * newQty;

          return {
            ...item,
            quantity: newQty,
            total_price,
          };
        }
        return item;
      }),
    })),
  clearOrders: () => set({ orders: [] }),
}));

export const useOrderListStore = create((set) => ({
  orders: [],
  totalIncome: 0,
  loading: false,
  error: null,

  fetchAllOrders: async (startDate, endDate, outlet) => {
    set({ loading: true, error: null });

    try {
      const res = await getOrders(startDate, endDate);

      if (outlet) {
        res.orders = res.orders.filter((order) => order.outlet === outlet);
      }

      console.log("res", res.orders);
      console.log(JSON.stringify(res.orders, null, 2));

      set({
        orders: res.orders,
        loading: false,
        totalIncome: res.totalIncome,
      });
    } catch (error) {
      console.error("Error fetching product list:", error);
      set({ error: error.message, loading: false });
    }
  },
}));
