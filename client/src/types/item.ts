export interface Item {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  categoryId: number;
  categoryName?: string;
}

export interface CreateItemPayload {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  categoryId: number;
}
