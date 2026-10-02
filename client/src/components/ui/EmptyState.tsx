interface EmptyStateProps {
  title: string;
  description: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

      <p className="mt-2 max-w-sm text-sm text-slate-500">{description}</p>
    </div>
  );
}
