import { create } from "zustand";

export const useKasirStore = create((set) => ({
  kasir: null,
  setKasir: (kasir) => set({ kasir }),
  outlet: null,
  setOutlet: (outlet) => set({ outlet }),
}));
