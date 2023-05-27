import { ErrorMessage } from '@hookform/error-message';
import Eye from '@icons/eye';
import EyeOff from '@icons/eye-off';
import cn from '@lib/util/cn';
import Text from '@modules/ui/text';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { get } from 'react-hook-form';

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
        <div className="group relative">
          <Input
            type={inputType}
            name={name}
            id={name}
            placeholder=" "
            className={cn(
              'peer block h-11 px-2.5 pb-2.5 pt-4',
              hasError && 'border-destructive'
            )}
            {...props}
            ref={inputRef}
          />
          <Label
            htmlFor={name}
            className={cn(
              'scale-80 absolute left-2 top-2 z-10 origin-[0] -translate-y-4 transform bg-white px-2.5 text-sm text-muted-foreground/70 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:left-2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:px-1 peer-focus:text-primary',
              hasError && '!text-destructive'
            )}
          >
            {label}
            {required && <span>*</span>}
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
                <Text size="sm" className="ml-2.5 pt-1" variant="error">
                  {message}
                </Text>
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
