import { ErrorMessage } from '@hookform/error-message';
import Eye from '@icons/eye';
import EyeOff from '@icons/eye-off';
import cn from '@lib/util/cn';
import { Input } from '@ui/input';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { get } from 'react-hook-form';
import { Label } from '@ui/label';

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'placeholder'
> & {
  label: string;
  errors?: Record<string, unknown>;
  touched?: Record<string, unknown>;
  name: string;
};

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, errors, touched, required, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState(type);

    useEffect(() => {
      if (type === 'password' && showPassword) {
        setInputType('text');
      }

      if (type === 'password' && !showPassword) {
        setInputType('password');
      }
    }, [type, showPassword]);

    useImperativeHandle(ref, () => inputRef.current!);

    const hasError = get(errors, name) && get(touched, name);

    return (
      <div>
        <div className="text-base-regular relative z-0 w-full">
          <Input
            type={inputType}
            name={name}
            placeholder=" "
            className={cn(
              '!h-full w-full px-4 pb-1.5 pt-4',
              hasError && 'border-destructive focus:border-destructive'
            )}
            {...props}
            ref={inputRef}
          />
          <Label
            htmlFor={name}
            onClick={() => inputRef.current?.focus()}
            className={cn(
              '-z-1 origin-0 absolute top-3.5 mx-3 px-1 text-muted-foreground transition-all duration-300',
              hasError && '!text-destructive'
            )}
          >
            {label}
            {required && <span className="text-destructive">*</span>}
          </Label>
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-3 px-4 text-muted-foreground outline-none transition-all duration-150 "
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
        {hasError && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => {
              return (
                <div className="text-xsmall-regular pl-2 pt-1 text-rose-500">
                  <span>{message}</span>
                </div>
              );
            }}
          />
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
