interface RoleBadgeProps {
  role?: string;
}

export default function RoleBadge({ role = "User" }: RoleBadgeProps) {
  const isAdmin = role === "Admin";

  return (
    <span
      className={`
        rounded-full px-2.5 py-1
        text-xs font-medium
        ${isAdmin ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-700"}
      `}
    >
      {role}
    </span>
  );
}
