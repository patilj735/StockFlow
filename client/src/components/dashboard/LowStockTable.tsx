import { Link } from "react-router-dom";
import Button from "../ui/Button";
import DataTable from "../ui/DataTable";
import EmptyState from "../ui/EmptyState";
import StockBadge from "../items/StockBadge";
import type { Item } from "../../types/item";

interface LowStockTableProps {
  items: Item[];
}

export default function LowStockTable({ items }: LowStockTableProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="No low stock items"
        description="Inventory levels look healthy."
      />
    );
  }

  return (
    <DataTable headers={["Item", "Category", "Quantity", "Status", "Actions"]}>
      {items.map((item) => (
        <tr key={item.id} className="hover:bg-slate-50">
          <td className="px-6 py-4">
            <div>
              <p className="text-sm font-medium text-slate-900">{item.name}</p>

              <p className="mt-1 text-sm text-slate-500">
                {item.description || "No description"}
              </p>
            </div>
          </td>

          <td className="px-6 py-4 text-sm text-slate-600">
            {item.categoryName}
          </td>

          <td className="px-6 py-4 text-sm font-medium text-slate-900">
            {item.quantity}
          </td>

          <td className="px-6 py-4">
            <StockBadge quantity={item.quantity} />
          </td>

          <td className="px-6 py-4">
            <Link to="/items">
              <Button size="sm" variant="secondary">
                View
              </Button>
            </Link>
          </td>
        </tr>
      ))}
    </DataTable>
  );
}
