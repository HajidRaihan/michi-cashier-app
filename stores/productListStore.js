import { fetchProducts } from "../services/productService";
import { fetchVariants } from "../services/variantService";
import { fetchAddons } from "../services/addonService";
import { create } from "zustand";

export const useProductListStore = create((set) => ({
  products: [],
  addons: [],
  loading: false,
  error: null,

  fetchAllProducts: async () => {
    set({ loading: true, error: null });

    try {
      const products = await fetchProducts();
      const variants = await fetchVariants();
      const addons = await fetchAddons();

      const productsWithVariants = products.map((product) => {
        const productVariants = variants.filter((v) => v.product_id === product.id);
        return {
          ...product,
          variants: productVariants,
        };
      });

      set({
        products: productsWithVariants,
        addons,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching product list:", error);
      set({ error: error.message, loading: false });
    }
  },

  fetchAddonsOnly: async () => {
    set({ loading: true, error: null });

    try {
      const addons = await fetchAddons();
      console.log("addons from service", addons);
      set({ addons, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
