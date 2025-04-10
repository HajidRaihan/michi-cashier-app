// services/orderService.js
import { supabase } from "../lib/supabase";

export async function getMenuItems() {
  const { data, error } = await supabase.from("menu").select("*");
  if (error) throw error;
  return data;
}
