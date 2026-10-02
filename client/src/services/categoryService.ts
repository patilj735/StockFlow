import api from "./api";
import type { Category, CreateCategoryPayload } from "../types/category";

export async function getCategories() {
  const response = await api.get("/categories");

  return response.data.data as Category[];
}

export async function createCategory(payload: CreateCategoryPayload) {
  const response = await api.post("/categories", payload);

  return response.data.data as Category;
}

export async function updateCategory(
  id: number,
  payload: CreateCategoryPayload,
) {
  const response = await api.put(`/categories/${id}`, payload);

  return response.data.data as Category;
}

export async function deleteCategory(id: number) {
  await api.delete(`/categories/${id}`);
}
