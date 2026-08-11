import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Tag } from "lucide-react";
import { categoriesApi } from "@/api/categories";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";

export function CategoryDetailsPage() {
  const { id } = useParams();
  const categoryId = Number(id);

  const { data: category, isLoading } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => categoriesApi.get(categoryId),
  });

  if (isLoading) return <Spinner label="Loading category…" />;
  if (!category) return null;

  return (
    <div>
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to books
      </Link>

      <Card className="mx-auto max-w-lg p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <Tag className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-semibold text-slate-900">{category.name}</h1>
        </div>
        <dl className="divide-y divide-slate-100 text-sm">
          <div className="flex justify-between py-2">
            <dt className="text-slate-500">Description</dt>
            <dd className="text-right text-slate-900">{category.description || "—"}</dd>
          </div>
          <div className="flex justify-between py-2">
            <dt className="text-slate-500">Status</dt>
            <dd className="text-slate-900">
              {category.validFlag === "Y" ? "Active" : "Inactive"}
            </dd>
          </div>
          {category.createdBy && (
            <div className="flex justify-between py-2">
              <dt className="text-slate-500">Added by</dt>
              <dd className="text-slate-900">{category.createdBy}</dd>
            </div>
          )}
          {category.createdAt && (
            <div className="flex justify-between py-2">
              <dt className="text-slate-500">Added on</dt>
              <dd className="text-slate-900">
                {new Date(category.createdAt).toLocaleDateString()}
              </dd>
            </div>
          )}
        </dl>
      </Card>
    </div>
  );
}
