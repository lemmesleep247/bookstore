import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...rest }, ref) => {
    const inputId = id ?? rest.name;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold uppercase tracking-wide text-slate-600"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full rounded-xl border bg-slate-50/80 px-3.5 py-2.5 text-sm text-slate-900 shadow-inner shadow-slate-100 placeholder:text-slate-400 transition-all duration-150 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 ${
            error
              ? "border-red-400 focus:ring-red-500"
              : "border-slate-300 hover:border-slate-400"
          } ${className}`}
          {...rest}
        />
        {error && (
          <span className="animate-fade-in text-xs font-medium text-red-600">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
