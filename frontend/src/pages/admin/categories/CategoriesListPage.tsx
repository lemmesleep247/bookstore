import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { categoriesApi } from "@/api/categories";
import { getErrorMessage } from "@/api/client";
import { useToastStore } from "@/store/toastStore";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export function CategoriesListPage() {
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.show);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const { data: categories, isLoading } = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: categoriesApi.listAdmin,
  });

  const deleteMutation = useMutation({
    mutationFn: categoriesApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      showToast("Category deleted", "success");
      setPendingDeleteId(null);
    },
    onError: (error) => showToast(getErrorMessage(error), "error"),
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Categories</h1>
          <p className="mt-1 text-sm text-slate-500">Manage book categories</p>
        </div>
        <Link to="/admin/categories/new">
          <Button icon={<Plus className="h-4 w-4" />}>Add category</Button>
        </Link>
      </div>

      {isLoading && <Spinner label="Loading categories…" />}

      {!isLoading && categories && categories.length === 0 && (
        <EmptyState title="No categories yet" description="Add your first category to get started." />
      )}

      {!isLoading && categories && categories.length > 0 && (
        <Card className="overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-4 py-3 font-medium text-slate-900">{category.name}</td>
                  <td className="px-4 py-3 text-slate-600">{category.description}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/categories/${category.id}/edit`}>
                        <Button variant="ghost" icon={<Pencil className="h-4 w-4" />} />
                      </Link>
                      <Button
                        variant="ghost"
                        icon={<Trash2 className="h-4 w-4 text-red-500" />}
                        onClick={() => setPendingDeleteId(category.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Delete category?"
        description="This cannot be undone."
        loading={deleteMutation.isPending}
        onConfirm={() => pendingDeleteId !== null && deleteMutation.mutate(pendingDeleteId)}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  );
}
