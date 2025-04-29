import { supabase } from "../lib/supabase";

export const getAllExpenses = async (startDate, endDate) => {
  try {
    let query = supabase.from("expenses").select("*");

    if (startDate && endDate) {
      query = query.gte("expense_date", startDate).lte("expense_date", endDate);
    }

    // Pastikan pengurutan dengan eksplisit mendeklarasikan columnnya
    const { data, error } = await query.order("expense_date", { ascending: false });

    if (error) throw error;

    const totalExpense = data.reduce((acc, expense) => {
      return acc + expense.amount;
    }, 0);

    return {
      expenses: data,
      totalExpense,
    };
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
