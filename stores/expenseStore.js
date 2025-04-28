import { create } from "zustand";
import { getAllExpenses } from "../services/expenseService";

const useExpenseStore = create((set) => ({
  expenses: [],
  loading: false,
  error: null,

  fetchAllExpenses: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getAllExpenses();
      console.log(res);
      set({
        expenses: res,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching variants:", error);
      set({ error: error.message, loading: false });
    }
  },
}));

export { useExpenseStore };
