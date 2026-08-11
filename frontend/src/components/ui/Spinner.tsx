import { Loader2 } from "lucide-react";

export function Spinner({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-500">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 ring-1 ring-brand-100">
        <Loader2 className="h-6 w-6 animate-spin text-brand-600" />
      </span>
      <span className="text-sm font-medium text-slate-600">{label}</span>
    </div>
  );
}
