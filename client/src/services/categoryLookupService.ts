import api from "./api";
import type { Category } from "../types/category";

export async function getCategoryOptions() {
  const response = await api.get("/categories");

  return response.data.data as Category[];
}
