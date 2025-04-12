import { fetchProducts, fetchProductsWithVariants } from "../services/productService";
import { fetchVariants } from "../services/variantService";
import { create } from "zustand";

export const useProductListStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchAllProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await fetchProductsWithVariants();

      set({
        products: products,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching product list:", error);
      set({ error: error.message, loading: false });
    }
  },
}));

//   fetchAllProducts: async () => {
//     set({ loading: true, error: null });

//     try {
//       const products = await fetchProducts();
//       const variants = await fetchVariants();

//       const productsWithVariants = products.map((product) => {
//         const productVariants = variants.filter((v) => v.product_id === product.id);
//         return {
//           ...product,
//           variants: productVariants,
//         };
//       });

//       set({
//         products: productsWithVariants,
//         loading: false,
//       });
//     } catch (error) {
//       console.error("Error fetching product list:", error);
//       set({ error: error.message, loading: false });
//     }
//   },
