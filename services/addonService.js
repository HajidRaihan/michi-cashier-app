import { supabase } from "../lib/supabase"; // sesuaikan path kalau berbeda

export const fetchAddons = async () => {
  try {
    const { data: addons, error } = await supabase.from("product_addons").select("*");
    if (error) throw error;
    return addons;
  } catch (err) {
    console.error("Error fetching addons:", err);
    throw err;
  }
};
