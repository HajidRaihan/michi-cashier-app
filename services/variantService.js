import { supabase } from "../lib/supabase";

export const fetchVariants = async () => {
  try {
    const { data: variants, error } = await supabase.from("product_variants").select("*");
    if (error) throw error;
    return variants;
  } catch (err) {
    console.error("Error fetching variants:", err);
    throw err;
  }
};
