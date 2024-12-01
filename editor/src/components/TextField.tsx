import { forwardRef, useId } from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const TextField = forwardRef<HTMLInputElement, Props>(function TextField(
  { label, error, ...inputProps },
  inputRef
) {
  const inputId = useId();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-sm font-bold self-start">
        {label}
      </label>
      <input
        id={inputId}
        className="px-2 py-1 dark:bg-slate-600"
        ref={inputRef}
        {...inputProps}
      />
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
});
