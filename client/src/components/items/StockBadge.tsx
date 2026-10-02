interface StockBadgeProps {
  quantity: number;
}

export default function StockBadge({ quantity }: StockBadgeProps) {
  if (quantity <= 0) {
    return (
      <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">
        Out of Stock
      </span>
    );
  }

  if (quantity < 5) {
    return (
      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
        Low Stock
      </span>
    );
  }

  return (
    <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
      In Stock
    </span>
  );
}
