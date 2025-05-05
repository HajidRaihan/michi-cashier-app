import { getAllExpenses } from "./expenseService";
import { getOrders } from "./orderService";

export const calculateRevenue = async (month, year) => {
  const { orders } = await getOrders();
  const { expenses } = await getAllExpenses();

  const totalRevenue = orders.reduce((acc, order) => {
    return acc + order.total_price;
  }, 0);

  const totalExpense = expenses.reduce((acc, expense) => {
    return acc + expense.amount;
  }, 0);

  return {
    totalOrderPrice: totalRevenue,
    totalExpense,
  };
};
