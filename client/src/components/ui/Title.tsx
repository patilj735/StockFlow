import type { ReactNode } from "react";

type TitleProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export default function Title({ title, subtitle, action }: TitleProps) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>

        {subtitle && <p className="mt-1 text-slate-600">{subtitle}</p>}
      </div>

      {action}
    </div>
  );
}
