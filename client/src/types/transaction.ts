export interface Transaction {
  id: number;
  borrowerName: string;
  borrowerEmail: string;
  itemId: number;
  itemName?: string;
  quantity: number;
  issuedAt: string;
  returnedAt?: string;
  isReturned: boolean;
}

export interface CreateTransactionPayload {
  borrowerName: string;
  borrowerEmail: string;
  itemId: number;
  quantity: number;
}
