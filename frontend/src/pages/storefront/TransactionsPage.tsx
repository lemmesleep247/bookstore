import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { purchasesApi } from "@/api/purchases";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pagination } from "@/components/ui/Pagination";

export function TransactionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNo = Number(searchParams.get("page") ?? "1");

  const { data, isLoading } = useQuery({
    queryKey: ["transactions", pageNo],
    queryFn: () => purchasesApi.list(pageNo),
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">My Orders</h1>
        <p className="mt-1 text-sm text-slate-500">A history of your book purchases</p>
      </div>

      {isLoading && <Spinner label="Loading orders…" />}

      {!isLoading && data && data.content.length === 0 && (
        <EmptyState title="No orders yet" description="Your purchases will show up here." />
      )}

      {!isLoading && data && data.content.length > 0 && (
        <>
          <Card className="overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Book</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.content.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">
                      {transaction.orderId.slice(0, 8)}…
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {transaction.bookTitle}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{transaction.quantity}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      ${transaction.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {new Date(transaction.createdAt).toLocaleDateString()}
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
    </div>
  );
}
