import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BookOpen, LogOut, Receipt, User } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Toaster } from "@/components/ui/Toaster";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-100"
  }`;

export function StorefrontLayout() {
  const { fullName, logout } = useAuthStore();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster />
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <NavLink to="/" className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <BookOpen className="h-6 w-6 text-brand-600" />
            Bookstore
          </NavLink>
          <nav className="flex items-center gap-1">
            <NavLink to="/" end className={navLinkClass}>
              Browse
            </NavLink>
            <NavLink to="/transactions" className={navLinkClass}>
              <Receipt className="h-4 w-4" />
              Orders
            </NavLink>
            <NavLink to="/profile" className={navLinkClass}>
              <User className="h-4 w-4" />
              {fullName ?? "Profile"}
            </NavLink>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
