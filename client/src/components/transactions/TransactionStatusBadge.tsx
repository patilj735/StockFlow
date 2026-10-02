interface TransactionStatusBadgeProps {
  isReturned: boolean;
}

export default function TransactionStatusBadge({
  isReturned,
}: TransactionStatusBadgeProps) {
  if (isReturned) {
    return (
      <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
        Returned
      </span>
    );
  }

  return (
    <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
      Active
    </span>
  );
}
