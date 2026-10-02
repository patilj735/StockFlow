import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { navigationItems } from "../../config/navigation";
import { useAuthStore } from "../../store/authStore";
import Button from "../ui/Button";
import RoleBadge from "./RoleBadge";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const currentPage = useMemo(() => {
    return navigationItems.find((item) => item.path === location.pathname);
  }, [location.pathname]);

  function handleLogout() {
    logout();

    navigate("/login");
  }

  // const initials =
  //   user?.fullName
  //     ?.split(" ")
  //     .map((part) => part.charAt(0))
  //     .join("")
  //     .slice(0, 2)
  //     .toUpperCase() || "U";

  return (
    <header
      className="
        flex h-16 items-center justify-between
        border-b border-slate-200
        bg-white px-4 sm:px-6
      "
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="
            rounded-lg border border-slate-200
            p-2 text-slate-700
            hover:bg-slate-100
            lg:hidden cursor-pointer
          "
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {currentPage?.label || "Dashboard"}
          </h2>

          <p className="hidden text-sm text-slate-500 sm:block">
            {currentPage?.description || "Manage your inventory system"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-slate-900">
            {user?.fullName || "User"}
          </p>

          <div className="mt-1 flex justify-end">
            <RoleBadge role={user?.role} />
          </div>
        </div>

        <div
          className="
            relative h-10 w-10 overflow-hidden
            rounded-full border border-slate-200 cursor-pointer
          "
        >
          <img
            src="/user.png"
            alt={user?.fullName || "User"}
            className="h-full w-full object-cover"
          />
        </div>

        <Button
          size="sm"
          variant="secondary"
          onClick={handleLogout}
          className="hidden sm:flex"
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
