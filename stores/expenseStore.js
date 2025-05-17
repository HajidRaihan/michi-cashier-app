import { create } from "zustand";
import { getAllExpenses } from "../services/expenseService";

const useExpenseStore = create((set) => ({
  expenses: [],
  totalExpense: 0,
  loading: false,
  error: null,

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Fetch all expenses from database with optional start date and end date filter
   * @param {string} startDate - ISO date string for start date filter
   * @param {string} endDate - ISO date string for end date filter
   * @returns {Promise<void>}

/*******  0c643352-f031-46fc-82be-037febb4e130  *******/
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
