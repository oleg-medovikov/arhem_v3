import clsx from 'clsx';
import { forwardRef, useId } from 'react';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export const TextareaField = forwardRef<HTMLTextAreaElement, Props>(
  function TextField({ className, label, error, ...inputProps }, inputRef) {
    const inputId = useId();

    return (
      <div className={clsx('flex flex-col', className)}>
        <label htmlFor={inputId} className="text-xs font-bold self-start">
          {label}
        </label>
        <textarea
          id={inputId}
          className="px-2 py-1 min-h-14 dark:bg-slate-600"
          ref={inputRef}
          {...inputProps}
        ></textarea>
        {error && (
          <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);
