export interface DashboardStats {
  totalItems: number;
  totalCategories: number;
  lowStockItems: number;
  activeTransactions: number;
  returnedTransactions: number;
}

export interface LowStockItem {
  id: number;
  name: string;
  quantity: number;
  categoryName: string;
}

export interface RecentTransaction {
  id: number;
  itemName: string;
  borrowerName: string;
  quantity: number;
  isReturned: boolean;
  issuedAt: string;
}
