// services/orderService.js
import { create } from "zustand";
import { supabase } from "../lib/supabase";
import { fetchAddons } from "./addonService";

export const getProductItems = async () => {
  const { data, error } = await supabase.from("products").select("*");

  if (error) throw error;
  return data;
};

export const getProductDetail = async (productId) => {
  try {
    // Ambil data produk berdasarkan ID
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (productError) throw productError;

    // Ambil variant berdasarkan product_id
    const { data: variants, error: variantError } = await supabase
      .from("product_variants")
      .select("*")
      .eq("product_id", productId);

    if (variantError) throw variantError;

    // Ambil semua add-ons
    const { data: addons, error: addonError } = await supabase.from("product_addons").select("*");

    if (addonError) throw addonError;

    // Gabungkan semua data
    return {
      ...product,
      variants,
      addons, // atau filter kalau mau berdasarkan kategori tertentu
    };
  } catch (err) {
    console.error("Error fetching product detail:", err);
    throw err;
  }
};

export const addProductItem = async (item) => {
  const { data, error } = await supabase.from("products").insert([item]);
  if (error) {
    throw error;
  }

  console.log("Product berhasil ditambahkan", data);
  return data;
};

export const deleteProductItem = async (id) => {
  const { data, error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
  return data;
};

export const updateProductItem = async (id, item) => {
  const { data, error } = await supabase.from("products").update(item).eq("id", id);
  if (error) throw error;
  return data;
};
export const getAllProductsWithVariantsAndAddons = async () => {
  try {
    // Ambil semua produk
    const { data: products, error: productError } = await supabase.from("products").select("*");
    // console.log({ products });

    if (productError) throw productError;

    // Ambil semua variant
    const { data: variants, error: variantError } = await supabase
      .from("product_variants")
      .select("*");

    if (variantError) throw variantError;

    // Ambil semua add-ons
    const { data: addons, error: addonError } = await supabase.from("product_addons").select("*");

    if (addonError) throw addonError;

    // Gabungkan variants ke masing-masing produk
    const productsWithVariants = products.map((product) => {
      const productVariants = variants.filter((v) => v.product_id === product.id);
      return {
        ...product,
        variants: productVariants,
      };
    });

    return {
      products: productsWithVariants,
      addons,
    };
  } catch (err) {
    console.error("Error fetching products with variants and addons:", err);
    throw err;
  }
};
// export const useProductListStore = create((set) => ({
//   products: [],
//   addons: [],
//   loading: false,
//   error: null,

//   fetchAllProducts: async () => {
//     set({ loading: true, error: null });

//     try {
//       const { data: products, error: productError } = await supabase.from("products").select("*");
//       if (productError) throw productError;

//       const { data: variants, error: variantError } = await supabase
//         .from("product_variants")
//         .select("*");
//       if (variantError) throw variantError;

//       const addons = await fetchAddons(); // gunakan service eksternal

//       const productsWithVariants = products.map((product) => {
//         const productVariants = variants.filter((v) => v.product_id === product.id);
//         return {
//           ...product,
//           variants: productVariants,
//         };
//       });

//       set({
//         products: productsWithVariants,
//         addons,
//         loading: false,
//       });
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       set({ error: error.message, loading: false });
//     }
//   },

//   fetchAddonsOnly: async () => {
//     set({ loading: true, error: null });

//     try {
//       const addons = await fetchAddons();
//       set({ addons, loading: false });
//     } catch (error) {
//       set({ error: error.message, loading: false });
//     }
//   },
// }));

export const fetchProducts = async () => {
  try {
    const { data: products, error } = await supabase.from("products").select("*");
    if (error) throw error;
    return products;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};
