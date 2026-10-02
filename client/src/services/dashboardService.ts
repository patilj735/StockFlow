import api from "./api";

export async function getDashboardStats() {
  const response = await api.get("/dashboard");

  return response.data.data;
}

export async function getLowStockItems() {
  const response = await api.get("/dashboard/low-stock");

  return response.data.data;
}

export async function getRecentTransactions() {
  const response = await api.get("/dashboard/recent-transactions");

  return response.data.data;
}
