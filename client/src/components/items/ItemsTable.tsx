import Button from "../ui/Button";
import DataTable from "../ui/DataTable";
import EmptyState from "../ui/EmptyState";
import StockBadge from "./StockBadge";
import type { Item } from "../../types/item";

interface ItemsTableProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

export default function ItemsTable({
  items,
  onEdit,
  onDelete,
}: ItemsTableProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="No items found"
        description="Create your first inventory item."
      />
    );
  }

  return (
    <DataTable
      headers={["Item", "Category", "Price", "Quantity", "Status", "Actions"]}
    >
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
            ${item.price.toFixed(2)}
          </td>

          <td className="px-6 py-4 text-sm text-slate-600">{item.quantity}</td>

          <td className="px-6 py-4">
            <StockBadge quantity={item.quantity} />
          </td>

          <td className="px-6 py-4">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onEdit(item)}
              >
                Edit
              </Button>

              <Button size="sm" variant="danger" onClick={() => onDelete(item)}>
                Delete
              </Button>
            </div>
          </td>
        </tr>
      ))}
    </DataTable>
  );
}
