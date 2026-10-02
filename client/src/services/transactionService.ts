import api from "./api";

import type {
  Transaction,
  CreateTransactionPayload,
} from "../types/transaction";

export async function getTransactions() {
  const response = await api.get("/transactions");

  return response.data.data as Transaction[];
}

export async function createTransaction(payload: CreateTransactionPayload) {
  const response = await api.post("/transactions/issue", payload);

  return response.data.data as Transaction;
}

export async function returnTransaction(id: number) {
  const response = await api.patch(`/transactions/${id}/return`);

  return response.data.data as Transaction;
}
