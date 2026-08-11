import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { publishersApi } from "@/api/publishers";
import { getErrorMessage } from "@/api/client";
import { useToastStore } from "@/store/toastStore";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export function PublishersListPage() {
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.show);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const { data: publishers, isLoading } = useQuery({
    queryKey: ["admin", "publishers"],
    queryFn: publishersApi.listAdmin,
  });

  const deleteMutation = useMutation({
    mutationFn: publishersApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "publishers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      showToast("Publisher deleted", "success");
      setPendingDeleteId(null);
    },
    onError: (error) => showToast(getErrorMessage(error), "error"),
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Publishers</h1>
          <p className="mt-1 text-sm text-slate-500">Manage book publishers</p>
        </div>
        <Link to="/admin/publishers/new">
          <Button icon={<Plus className="h-4 w-4" />}>Add publisher</Button>
        </Link>
      </div>

      {isLoading && <Spinner label="Loading publishers…" />}

      {!isLoading && publishers && publishers.length === 0 && (
        <EmptyState title="No publishers yet" description="Add your first publisher to get started." />
      )}

      {!isLoading && publishers && publishers.length > 0 && (
        <Card className="overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {publishers.map((publisher) => (
                <tr key={publisher.id}>
                  <td className="px-4 py-3 font-medium text-slate-900">{publisher.name}</td>
                  <td className="px-4 py-3 text-slate-600">{publisher.email}</td>
                  <td className="px-4 py-3 text-slate-600">{publisher.phone}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/publishers/${publisher.id}/edit`}>
                        <Button variant="ghost" icon={<Pencil className="h-4 w-4" />} />
                      </Link>
                      <Button
                        variant="ghost"
                        icon={<Trash2 className="h-4 w-4 text-red-500" />}
                        onClick={() => setPendingDeleteId(publisher.id)}
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
        title="Delete publisher?"
        description="This cannot be undone."
        loading={deleteMutation.isPending}
        onConfirm={() => pendingDeleteId !== null && deleteMutation.mutate(pendingDeleteId)}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  );
}
