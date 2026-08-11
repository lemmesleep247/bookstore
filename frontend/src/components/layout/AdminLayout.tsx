import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  BookOpen,
  LayoutDashboard,
  Library,
  LogOut,
  PenSquare,
  Tags,
  Warehouse,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Toaster } from "@/components/ui/Toaster";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/books", label: "Books", icon: Library },
  { to: "/admin/authors", label: "Authors", icon: PenSquare },
  { to: "/admin/categories", label: "Categories", icon: Tags },
  { to: "/admin/publishers", label: "Publishers", icon: Warehouse },
];

export function AdminLayout() {
  const { fullName, logout } = useAuthStore();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Toaster />
      <aside className="flex w-64 flex-col border-r border-slate-200 bg-white">
        <div className="flex items-center gap-2 px-5 py-5 text-lg font-semibold text-slate-900">
          <BookOpen className="h-6 w-6 text-brand-600" />
          Bookstore Admin
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-slate-200 p-3">
          <p className="px-2 pb-2 text-xs text-slate-400">Signed in as</p>
          <p className="px-2 pb-3 text-sm font-medium text-slate-700">{fullName}</p>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
