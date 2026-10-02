import { Link } from "react-router-dom";
import Button from "../ui/Button";
import DataTable from "../ui/DataTable";
import EmptyState from "../ui/EmptyState";
import TransactionStatusBadge from "../transactions/TransactionStatusBadge";
import type { Transaction } from "../../types/transaction";

interface RecentTransactionsTableProps {
  transactions: Transaction[];
}

export default function RecentTransactionsTable({
  transactions,
}: RecentTransactionsTableProps) {
  if (transactions.length === 0) {
    return (
      <EmptyState
        title="No recent transactions"
        description="Issue inventory items to see activity."
      />
    );
  }

  return (
    <DataTable headers={["Borrower", "Item", "Issued", "Status", "Actions"]}>
      {transactions.map((transaction) => (
        <tr key={transaction.id} className="hover:bg-slate-50">
          <td className="px-6 py-4">
            <p className="text-sm font-medium text-slate-900">
              {transaction.borrowerName}
            </p>
          </td>

          <td className="px-6 py-4 text-sm text-slate-600">
            {transaction.itemName}
          </td>

          <td className="px-6 py-4 text-sm text-slate-600">
            {new Date(transaction.issuedAt).toLocaleDateString()}
          </td>

          <td className="px-6 py-4">
            <TransactionStatusBadge isReturned={transaction.isReturned} />
          </td>

          <td className="px-6 py-4">
            <Link to="/transactions">
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
