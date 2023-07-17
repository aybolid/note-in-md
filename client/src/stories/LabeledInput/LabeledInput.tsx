import {
  FC,
  ReactNode,
  Ref,
  SyntheticEvent,
  forwardRef,
  useState,
} from 'react';
import { FieldErrors } from 'react-hook-form';
import { UserSignupCredentials } from '../../types/auth';
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';

interface LabeledInputProps {
  label: string;
  onChange: (e: SyntheticEvent) => void;
  name: string;
  type:
    | 'button'
    | 'text'
    | 'checkbox'
    | 'email'
    | 'password'
    | 'radio'
    | 'tel'
    | 'date';
  errors: FieldErrors<UserSignupCredentials>;
  children?: ReactNode;
  placeholder?: string;
  autoComplete?: 'on' | 'off';
  onBlur?: (e: SyntheticEvent) => void;
  ref?: Ref<HTMLInputElement>;
  className?: string;
  labelClassName?: string;
}

export const LabeledInput: FC<LabeledInputProps> = forwardRef(
  (
    {
      label,
      onChange,
      name,
      type,
      placeholder,
      autoComplete = 'off',
      onBlur,
      className,
      labelClassName,
      children,
      errors,
      ...props
    },
    ref: Ref<HTMLInputElement>
  ) => {
    const [inputType, setInputType] = useState(type);

    const togglePasswordVisibility = () => {
      setInputType((prevType) =>
        prevType === 'password' ? 'text' : 'password'
      );
    };

    return (
      <>
        <label className={`group w-full block ${labelClassName || ''}`}>
          {label}
          <div className={`${type === 'password' ? 'input-password' : ''}`}>
            <input
              className={`input ${className || ''} ${
                errors[name as keyof UserSignupCredentials]
                  ? 'border-red-500 focus:border-red-600'
                  : ''
              } `}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              type={inputType}
              ref={ref}
              autoComplete={autoComplete}
              {...props}
            />
            {type === 'password' && (
              <button
                className="absolute top-2/4 right-2 -translate-y-2/4 group-focus-within:block hidden "
                onClick={togglePasswordVisibility}
                type="button"
              >
                {inputType === 'password' ? (
                  <IoMdEyeOff size={20} />
                ) : (
                  <IoMdEye size={20} />
                )}
              </button>
            )}
          </div>
          {children}
        </label>
      </>
    );
  }
);

export default LabeledInput;
