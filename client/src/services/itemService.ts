import api from "./api";
import type { CreateItemPayload, Item } from "../types/item";

export interface GetItemsParams {
  search?: string;
  categoryId?: number;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: string;
}

export async function getItems(params?: GetItemsParams) {
  const response = await api.get("/items", { params });

  const items = response.data.data as Item[];

  const totalCount = parseInt(response.headers["x-total-count"] || "0", 10);

  return {
    items,
    totalCount
  };
}

export async function createItem(payload: CreateItemPayload) {
  const response = await api.post("/items", payload);

  return response.data.data as Item;
}

export async function updateItem(id: number, payload: CreateItemPayload) {
  const response = await api.put(`/items/${id}`, payload);

  return response.data.data as Item;
}

export async function deleteItem(id: number) {
  await api.delete(`/items/${id}`);
}
