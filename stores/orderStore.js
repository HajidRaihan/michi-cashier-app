import { create } from "zustand";

export const useOrderStore = create((set) => ({
  orders: [],
  totalOrderPrice: 0, // total keseluruhan

  addToOrder: ({ product_id, name, base_price, variant, addons = [], quantity, total_price }) => {
    const orderItem = {
      product_id,
      name,
      base_price,
      variant_id: variant?.id,
      variant_type: variant?.variant_type,
      variant_value: variant?.variant_value,
      variant_extra_price: variant?.extra_price || 0,
      addons,
      quantity,
      total_price,
    };

    set((state) => {
      const updatedOrders = [...state.orders, orderItem];
      const newTotal = updatedOrders.reduce((sum, item) => sum + item.total_price, 0);

      return {
        orders: updatedOrders,
        totalOrderPrice: newTotal,
      };
    });
  },

  removeFromOrder: (product_id, variant_id) =>
    set((state) => {
      const filteredOrders = state.orders.filter(
        (item) => item.product_id !== product_id || item.variant_id !== variant_id
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
          const addonsTotal = item.addons.reduce((sum, a) => sum + a.price, 0);
          const total_price = (item.base_price + variantExtra + addonsTotal) * newQty;

          return {
            ...item,
            quantity: newQty,
            total_price,
          };
        }
        return item;
      }),
    })),

  //   removeFromOrder: (product_id, variant_id) =>
  //     set((state) => ({
  //       orders: state.orders.filter(
  //         (item) => item.product_id !== product_id || item.variant_id !== variant_id
  //       ),
  //     })),

  clearOrders: () => set({ orders: [] }),
}));
