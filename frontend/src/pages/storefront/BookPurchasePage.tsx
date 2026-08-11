import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft, BookOpen, ShoppingCart, Tag, Users, Warehouse } from "lucide-react";
import { booksApi } from "@/api/books";
import { purchasesApi } from "@/api/purchases";
import { getErrorMessage } from "@/api/client";
import { useToastStore } from "@/store/toastStore";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";

export function BookPurchasePage() {
  const { id } = useParams();
  const bookId = Number(id);
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.show);
  const [quantity, setQuantity] = useState(1);

  const { data: book, isLoading } = useQuery({
    queryKey: ["book", bookId],
    queryFn: () => booksApi.get(bookId),
  });

  const mutation = useMutation({
    mutationFn: () => purchasesApi.purchase({ bookId, quantity }),
    onSuccess: (result) => {
      navigate("/purchase-success", { state: result });
    },
    onError: (error) => showToast(getErrorMessage(error), "error"),
  });

  if (isLoading) return <Spinner label="Loading book…" />;
  if (!book) return null;

  return (
    <div>
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to books
      </Link>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Card className="flex h-56 items-center justify-center bg-brand-50 text-brand-300 md:col-span-1">
          <BookOpen className="h-16 w-16" />
        </Card>

        <div className="md:col-span-2">
          <h1 className="text-2xl font-semibold text-slate-900">{book.title}</h1>
          <p className="mt-2 text-slate-600">{book.description}</p>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
            <Link
              to={`/categories/${book.categoryId}`}
              className="inline-flex items-center gap-1.5 hover:text-brand-600"
            >
              <Tag className="h-4 w-4" />
              {book.categoryName}
            </Link>
            <Link
              to={`/publishers/${book.publisherId}`}
              className="inline-flex items-center gap-1.5 hover:text-brand-600"
            >
              <Warehouse className="h-4 w-4" />
              {book.publisherName}
            </Link>
            {book.authorNames.length > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                {book.authorNames.join(", ")}
              </span>
            )}
          </div>

          <Card className="mt-6 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-2xl font-semibold text-slate-900">${book.price.toFixed(2)}</p>
              <p className="text-sm text-slate-500">{book.copies} copies available</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                max={Math.max(book.copies, 1)}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-20 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <Button
                icon={<ShoppingCart className="h-4 w-4" />}
                loading={mutation.isPending}
                disabled={book.copies < 1}
                onClick={() => mutation.mutate()}
              >
                {book.copies < 1 ? "Out of stock" : "Purchase"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
