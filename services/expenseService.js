import { supabase } from "../lib/supabase";

export const getAllExpenses = async (startDate, endDate) => {
  try {
    let query = supabase.from("expenses").select("*");

    // Tambahkan filter tanggal berdasarkan kondisi yang tersedia
    if (startDate && endDate) {
      query = query.gte("expense_date", startDate).lte("expense_date", endDate);
    } else if (startDate) {
      query = query.gte("expense_date", startDate);
    } else if (endDate) {
      query = query.lte("expense_date", endDate);
    }

    // Pengurutan berdasarkan tanggal pengeluaran
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
