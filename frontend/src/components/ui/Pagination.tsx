import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  pageNo: number;
  totalPages: number;
  onPageChange: (pageNo: number) => void;
}

export function Pagination({
  pageNo,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 py-7">
      <button
        onClick={() => onPageChange(pageNo - 1)}
        disabled={pageNo <= 1}
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
        Page <span className="font-bold text-slate-900">{pageNo}</span> of{" "}
        <span className="font-bold text-slate-900">{totalPages}</span>
      </span>
      <button
        onClick={() => onPageChange(pageNo + 1)}
        disabled={pageNo >= totalPages}
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
