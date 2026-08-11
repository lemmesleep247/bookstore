import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Tag, Warehouse } from "lucide-react";
import { booksApi } from "@/api/books";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pagination } from "@/components/ui/Pagination";

export function BooksBrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNo = Number(searchParams.get("page") ?? "1");

  const { data, isLoading } = useQuery({
    queryKey: ["books", pageNo],
    queryFn: () => booksApi.list(pageNo),
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Browse Books</h1>
        <p className="mt-1 text-sm text-slate-500">Discover and purchase from our catalog</p>
      </div>

      {isLoading && <Spinner label="Loading books…" />}

      {!isLoading && data && data.content.length === 0 && (
        <EmptyState title="No books available yet" description="Check back soon for new arrivals." />
      )}

      {!isLoading && data && data.content.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.content.map((book) => (
              <Link key={book.id} to={`/books/${book.id}`}>
                <Card className="flex h-full flex-col p-5 transition-shadow hover:shadow-md">
                  <div className="mb-3 flex h-32 items-center justify-center rounded-lg bg-brand-50 text-brand-300">
                    <BookOpen className="h-10 w-10" />
                  </div>
                  <h3 className="line-clamp-2 font-semibold text-slate-900">{book.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">{book.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1">
                      <Tag className="h-3 w-3" />
                      {book.categoryName}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1">
                      <Warehouse className="h-3 w-3" />
                      {book.publisherName}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-semibold text-slate-900">
                      ${book.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-slate-400">{book.copies} in stock</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          <Pagination
            pageNo={data.pageNo}
            totalPages={data.totalPages}
            onPageChange={(page) => setSearchParams({ page: String(page) })}
          />
        </>
      )}
    </div>
  );
}
