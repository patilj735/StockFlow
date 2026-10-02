import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500",
        className,
      )}
      {...props}
    />
  );
}
