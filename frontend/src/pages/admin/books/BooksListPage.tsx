import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { booksApi } from "@/api/books";
import { getErrorMessage } from "@/api/client";
import { useToastStore } from "@/store/toastStore";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Pagination } from "@/components/ui/Pagination";

export function BooksListPage() {
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.show);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNo = Number(searchParams.get("page") ?? "1");
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "books", pageNo],
    queryFn: () => booksApi.list(pageNo),
  });

  const deleteMutation = useMutation({
    mutationFn: booksApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "books"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      showToast("Book deleted", "success");
      setPendingDeleteId(null);
    },
    onError: (error) => showToast(getErrorMessage(error), "error"),
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Books</h1>
          <p className="mt-1 text-sm text-slate-500">Manage your book catalog</p>
        </div>
        <Link to="/admin/books/new">
          <Button icon={<Plus className="h-4 w-4" />}>Add book</Button>
        </Link>
      </div>

      {isLoading && <Spinner label="Loading books…" />}

      {!isLoading && data && data.content.length === 0 && (
        <EmptyState title="No books yet" description="Add your first book to get started." />
      )}

      {!isLoading && data && data.content.length > 0 && (
        <>
          <Card className="overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Publisher</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Copies</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.content.map((book) => (
                  <tr key={book.id}>
                    <td className="px-4 py-3 font-medium text-slate-900">{book.title}</td>
                    <td className="px-4 py-3 text-slate-600">{book.categoryName}</td>
                    <td className="px-4 py-3 text-slate-600">{book.publisherName}</td>
                    <td className="px-4 py-3 text-slate-600">${book.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-slate-600">{book.copies}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link to={`/admin/books/${book.id}/edit`}>
                          <Button variant="ghost" icon={<Pencil className="h-4 w-4" />} />
                        </Link>
                        <Button
                          variant="ghost"
                          icon={<Trash2 className="h-4 w-4 text-red-500" />}
                          onClick={() => setPendingDeleteId(book.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <Pagination
            pageNo={data.pageNo}
            totalPages={data.totalPages}
            onPageChange={(page) => setSearchParams({ page: String(page) })}
          />
        </>
      )}

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Delete book?"
        description="This cannot be undone."
        loading={deleteMutation.isPending}
        onConfirm={() => pendingDeleteId !== null && deleteMutation.mutate(pendingDeleteId)}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  );
}
