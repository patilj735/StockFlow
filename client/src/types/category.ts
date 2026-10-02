export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface CreateCategoryPayload {
  name: string;
  description?: string;
}
