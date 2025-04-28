import { supabase } from "../lib/supabase";

export const getAllExpenses = async () => {
  try {
    const { data, error } = await supabase.from("expenses").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

export const createExpenses = async (expense) => {
  console.log({ expense });
  console.log("oioio");
  try {
    const res = await supabase.from("expenses").insert([expense]);
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteExpense = async (id) => {
  try {
    const res = await supabase.from("expenses").delete().eq("id", id);
    return res;
  } catch (error) {
    throw error;
  }
};

// export { getAllExpenses, createExpenses };
