import type { LabelHTMLAttributes } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export default function Label({ children, ...props }: LabelProps) {
  return (
    <label className="mb-2 block text-sm font-medium text-slate-700" {...props}>
      {children}
    </label>
  );
}
