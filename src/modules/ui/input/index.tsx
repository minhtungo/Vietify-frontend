import cn from '@lib/util/cn';
import * as React from 'react';
import { get } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: Record<string, unknown>;
  touched?: Record<string, unknown>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errors, touched, name, ...props }, ref) => {
    // const hasError = get(errors, name) && get(touched, name);
    const hasError = get(errors, name);

    return (
      <>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand/50 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />

        {hasError && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => {
              return (
                <p
                  className={cn(
                    'text-sm font-medium text-destructive',
                    className
                  )}
                  {...props}
                >
                  {message}
                </p>
              );
            }}
          />
        )}
      </>
    );
  }
);
Input.displayName = 'Input';

export { Input };
