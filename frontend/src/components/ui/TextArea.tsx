import { forwardRef, type TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className = "", id, ...rest }, ref) => {
    const areaId = id ?? rest.name;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={areaId}
            className="text-xs font-semibold uppercase tracking-wide text-slate-600"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={areaId}
          rows={4}
          className={`w-full rounded-xl border bg-slate-50/80 px-3.5 py-2.5 text-sm text-slate-900 shadow-inner shadow-slate-100 placeholder:text-slate-400 transition-all duration-150 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 ${
            error
              ? "border-red-400 focus:ring-red-500"
              : "border-slate-300 hover:border-slate-400"
          } ${className}`}
          {...rest}
        />
        {error && (
          <span className="text-xs font-medium text-red-600">{error}</span>
        )}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";
