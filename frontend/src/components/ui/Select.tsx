import { forwardRef, type SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className = "", id, children, ...rest }, ref) => {
    const selectId = id ?? rest.name;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-semibold uppercase tracking-wide text-slate-600"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`w-full rounded-xl border bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 shadow-inner shadow-slate-100 transition-all duration-150 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 ${
            error
              ? "border-red-400 focus:ring-red-500"
              : "border-slate-300 hover:border-slate-400"
          } ${className}`}
          {...rest}
        >
          {children}
        </select>
        {error && (
          <span className="text-xs font-medium text-red-600">{error}</span>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
