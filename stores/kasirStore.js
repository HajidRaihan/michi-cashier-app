import { create } from "zustand";

export const useKasirStore = create((set) => ({
  kasir: null,
  setKasir: (kasir) => set({ kasir }),
  outlet: null,
  setOutlet: (outlet) => set({ outlet }),
  cash: 0,
  setCash: (cash) => set({ cash }),
  kembalian: 0,
  setKembalian: (kembalian) => set({ kembalian }),
  customer: null,
  setCustomer: (customer) => set({ customer }),
}));
