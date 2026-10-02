import type { ReactNode } from "react";
import Label from "../ui/Label";

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

export default function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {children}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
