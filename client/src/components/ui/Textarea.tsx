import type { TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500",
        className,
      )}
      {...props}
    />
  );
}
