import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type BadgeProps = {
  children: ReactNode;
  variant?: "success" | "warning" | "danger";
};

export default function Badge({ children, variant = "success" }: BadgeProps) {
  const variants = {
    success: "bg-green-100 text-green-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-sm font-medium",
        variants[variant],
      )}
    >
      {children}
    </span>
  );
}
