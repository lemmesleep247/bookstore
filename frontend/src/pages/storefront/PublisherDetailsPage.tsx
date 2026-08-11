import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Warehouse } from "lucide-react";
import { publishersApi } from "@/api/publishers";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";

export function PublisherDetailsPage() {
  const { id } = useParams();
  const publisherId = Number(id);

  const { data: publisher, isLoading } = useQuery({
    queryKey: ["publisher", publisherId],
    queryFn: () => publishersApi.get(publisherId),
  });

  if (isLoading) return <Spinner label="Loading publisher…" />;
  if (!publisher) return null;

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
            <Warehouse className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-semibold text-slate-900">{publisher.name}</h1>
        </div>
        <dl className="divide-y divide-slate-100 text-sm">
          <div className="flex justify-between py-2">
            <dt className="text-slate-500">Email</dt>
            <dd className="text-slate-900">
              <a href={`mailto:${publisher.email}`} className="text-brand-600 hover:underline">
                {publisher.email}
              </a>
            </dd>
          </div>
          <div className="flex justify-between py-2">
            <dt className="text-slate-500">Phone</dt>
            <dd className="text-slate-900">{publisher.phone || "—"}</dd>
          </div>
          <div className="flex justify-between py-2">
            <dt className="text-slate-500">Address</dt>
            <dd className="text-right text-slate-900">{publisher.address || "—"}</dd>
          </div>
          <div className="flex justify-between py-2">
            <dt className="text-slate-500">Status</dt>
            <dd className="text-slate-900">
              {publisher.validFlag === "Y" ? "Active" : "Inactive"}
            </dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
