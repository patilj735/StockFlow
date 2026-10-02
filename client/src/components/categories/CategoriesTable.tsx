import Button from "../ui/Button";
import DataTable from "../ui/DataTable";
import EmptyState from "../ui/EmptyState";
import type { Category } from "../../types/category";

interface CategoriesTableProps {
  categories: Category[];

  onEdit: (category: Category) => void;

  onDelete: (category: Category) => void;
}

export default function CategoriesTable({
  categories,
  onEdit,
  onDelete,
}: CategoriesTableProps) {
  if (categories.length === 0) {
    return (
      <EmptyState
        title="No categories found"
        description="Create your first inventory category."
      />
    );
  }

  return (
    <DataTable headers={["Name", "Description", "Actions"]}>
      {categories.map((category) => (
        <tr key={category.id} className="hover:bg-slate-50">
          <td className="px-6 py-4 text-sm font-medium text-slate-900">
            {category.name}
          </td>

          <td className="px-6 py-4 text-sm text-slate-600">
            {category.description || "No description"}
          </td>

          <td className="px-6 py-4">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onEdit(category)}
              >
                Edit
              </Button>

              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(category)}
              >
                Delete
              </Button>
            </div>
          </td>
        </tr>
      ))}
    </DataTable>
  );
}
