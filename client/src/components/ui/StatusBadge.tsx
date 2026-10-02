interface StatusBadgeProps {
  status: "success" | "warning" | "danger";
  children: React.ReactNode;
}

const statusStyles = {
  success: "bg-green-100 text-green-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-red-700",
};

export default function StatusBadge({ status, children }: StatusBadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium
        ${statusStyles[status]}
      `}
    >
      {children}
    </span>
  );
}
