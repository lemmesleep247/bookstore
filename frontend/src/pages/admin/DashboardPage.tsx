import { useQuery } from "@tanstack/react-query";
import { Library, PenSquare, Tags, Warehouse } from "lucide-react";
import { dashboardApi } from "@/api/dashboard";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";

const stats = [
  { key: "booksCount", label: "Books", icon: Library, color: "bg-brand-50 text-brand-600" },
  { key: "authorsCount", label: "Authors", icon: PenSquare, color: "bg-amber-50 text-amber-600" },
  { key: "categoriesCount", label: "Categories", icon: Tags, color: "bg-emerald-50 text-emerald-600" },
  { key: "publishersCount", label: "Publishers", icon: Warehouse, color: "bg-violet-50 text-violet-600" },
] as const;

export function DashboardPage() {
  const { data, isLoading } = useQuery({ queryKey: ["dashboard"], queryFn: dashboardApi.get });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Overview of your bookstore catalog</p>
      </div>

      {isLoading && <Spinner label="Loading stats…" />}

      {data && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ key, label, icon: Icon, color }) => (
            <Card key={key} className="p-5">
              <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-semibold text-slate-900">{data[key]}</p>
              <p className="text-sm text-slate-500">{label}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
