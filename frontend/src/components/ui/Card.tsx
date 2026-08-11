import type { HTMLAttributes } from "react";

export function Card({
  className = "",
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white/95 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.9)] backdrop-blur-sm ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
