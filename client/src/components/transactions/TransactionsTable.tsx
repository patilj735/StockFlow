import Button from "../ui/Button";
import DataTable from "../ui/DataTable";
import EmptyState from "../ui/EmptyState";
import TransactionStatusBadge from "./TransactionStatusBadge";
import type { Transaction } from "../../types/transaction";

interface TransactionsTableProps {
  transactions: Transaction[];

  onReturn: (transaction: Transaction) => void;
}

export default function TransactionsTable({
  transactions,
  onReturn,
}: TransactionsTableProps) {
  if (transactions.length === 0) {
    return (
      <EmptyState
        title="No transactions found"
        description="Issue inventory items to create transactions."
      />
    );
  }

  return (
    <DataTable
      headers={["Borrower", "Item", "Quantity", "Issued", "Status", "Actions"]}
    >
      {transactions.map((transaction) => (
        <tr key={transaction.id} className="hover:bg-slate-50">
          <td className="px-6 py-4">
            <div>
              <p className="text-sm font-medium text-slate-900">
                {transaction.borrowerName}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {transaction.borrowerEmail}
              </p>
            </div>
          </td>

          <td className="px-6 py-4 text-sm text-slate-600">
            {transaction.itemName}
          </td>

          <td className="px-6 py-4 text-sm text-slate-600">
            {transaction.quantity}
          </td>

          <td className="px-6 py-4 text-sm text-slate-600">
            {new Date(transaction.issuedAt).toLocaleDateString()}
          </td>

          <td className="px-6 py-4">
            <TransactionStatusBadge isReturned={transaction.isReturned} />
          </td>

          <td className="px-6 py-4">
            {!transaction.isReturned && (
              <Button size="sm" onClick={() => onReturn(transaction)}>
                Return
              </Button>
            )}
          </td>
        </tr>
      ))}
    </DataTable>
  );
}
