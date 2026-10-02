type TableProps = {
  headers: string[];
};

export default function Table({ headers }: TableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <table className="w-full border-collapse">
        <thead className="bg-slate-100">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-6 py-4 text-left text-sm font-semibold text-slate-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr className="border-t border-slate-200 hover:bg-slate-50">
            <td className="px-6 py-4 text-slate-700">MacBook Pro</td>

            <td className="px-6 py-4 text-slate-700">Electronics</td>

            <td className="px-6 py-4 text-slate-700">12</td>

            <td className="px-6 py-4">In Stock</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
