import { create } from "zustand";
import { getAllVariants } from "../services/variantService";

export const useVariantStore = create((set) => ({
  variants: [],
  loading: false,
  error: null,

  fetchvariants: async () => {
    set({ loading: true, error: null });

    try {
      const res = await getAllVariants();

      set({
        variants: res,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching variants:", error);
      set({ error: error.message, loading: false });
    }
  },
}));
