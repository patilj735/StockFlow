import type { SelectHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none transition-colors focus:border-blue-500",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
