import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, className = "", id, ...rest }, ref) => {
    const [visible, setVisible] = useState(false);
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
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={visible ? "text" : "password"}
            className={`w-full rounded-xl border bg-slate-50/80 px-3.5 py-2.5 pr-10 text-sm text-slate-900 shadow-inner shadow-slate-100 placeholder:text-slate-400 transition-all duration-150 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              error
                ? "border-red-400 focus:ring-red-500"
                : "border-slate-300 hover:border-slate-400"
            } ${className}`}
            {...rest}
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setVisible((v) => !v)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 transition-colors hover:text-slate-600"
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {error && (
          <span className="animate-fade-in text-xs font-medium text-red-600">
            {error}
          </span>
        )}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
