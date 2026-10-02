import { X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { navigationItems } from "../../config/navigation";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="
            fixed inset-0 z-40
            bg-black/40 lg:hidden
          "
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-64 flex-col
          border-r border-slate-800
          bg-slate-900
          transition-transform duration-300
          lg:static lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div
          className="
            flex items-center justify-between
            border-b border-slate-800
            px-6 py-5
          "
        >
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-white">
              StockFlow
            </h1>

            <p className="mt-1 text-sm text-slate-400">Inventory Management</p>
          </div>

          <button
            onClick={onClose}
            className="
              rounded-lg p-2 text-slate-400
              hover:bg-slate-800
              hover:text-white
              lg:hidden
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `
                  rounded-lg px-4 py-2.5
                  text-sm font-medium
                  transition-colors
                  ${
                    isActive
                      ? "bg-slate-800 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }
                  `
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
