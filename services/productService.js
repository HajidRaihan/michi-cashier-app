// services/orderService.js
import { supabase } from "../lib/supabase";

export const getProductItems = async () => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw error;
  return data;
};

export const addProductItem = async (item) => {
  const { data, error } = await supabase.from("products").insert([item]);
  if (error) {
    throw error;
  }

  console.log("Product berhasil ditambahkan", data);
  return data;
};
