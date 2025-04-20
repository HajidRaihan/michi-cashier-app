import { supabase } from "../lib/supabase";

export const getAllVariants = async () => {
  try {
    const { data: variants, error } = await supabase.from("variant_types").select("*");
    if (error) throw error;
    return variants;
  } catch (err) {
    console.error("Error fetching variants:", err);
    throw err;
  }
};
