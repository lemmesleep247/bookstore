import { Link, Navigate, useLocation } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import type { PurchaseResult } from "@/api/purchases";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function PurchaseSuccessPage() {
  const location = useLocation();
  const result = location.state as PurchaseResult | null;

  if (!result) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex justify-center py-10">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="text-xl font-semibold text-slate-900">Purchase confirmed!</h1>
        <p className="mt-1 text-sm text-slate-500">
          Your order has been placed successfully.
        </p>

        <dl className="mt-6 space-y-3 rounded-lg bg-slate-50 p-4 text-left text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-500">Order ID</dt>
            <dd className="font-mono text-xs text-slate-700">{result.orderId}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Book</dt>
            <dd className="font-medium text-slate-900">{result.bookTitle}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Quantity</dt>
            <dd className="font-medium text-slate-900">{result.quantity}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Total</dt>
            <dd className="font-semibold text-slate-900">${result.totalPrice.toFixed(2)}</dd>
          </div>
        </dl>

        <div className="mt-6 flex gap-3">
          <Link to="/" className="flex-1">
            <Button variant="secondary" className="w-full">
              Continue shopping
            </Button>
          </Link>
          <Link to="/transactions" className="flex-1">
            <Button className="w-full">View orders</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
