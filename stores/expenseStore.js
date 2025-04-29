import { create } from "zustand";
import { getAllExpenses } from "../services/expenseService";

const useExpenseStore = create((set) => ({
  expenses: [],
  totalExpense: 0,
  loading: false,
  error: null,

  fetchAllExpenses: async (startDate, endDate) => {
    set({ loading: true, error: null });
    try {
      const { expenses, totalExpense } = await getAllExpenses(startDate, endDate);
      set({
        expenses: expenses,
        totalExpense: totalExpense,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching variants:", error);
      set({ error: error.message, loading: false });
    }
  },
}));

export { useExpenseStore };
