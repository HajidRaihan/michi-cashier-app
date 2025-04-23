import { supabase } from "../lib/supabase";

const getAllExpenses = async () => {
  try {
    const res = await supabase.from("expenses").select("*");
    return res;
  } catch (error) {
    throw error;
  }
};

const createExpenses = async (expense) => {
  try {
    const res = await supabase.from("expenses").insert([expense]);
    return res;
  } catch (error) {
    throw error;
  }
};

export { getAllExpenses, createExpenses };
