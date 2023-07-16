import { FC, Ref, SyntheticEvent, forwardRef } from 'react'

interface LabeledInputProps {
  label: string
  onChange: (e: SyntheticEvent) => void
  name: string
  type: 'button' | 'text' | 'checkbox' | 'email' | 'password' | 'radio' | 'tel'
  placeholder?: string
  autoComplete?: 'on' | 'off'
  onBlur?: (e: SyntheticEvent) => void
  ref?: Ref<HTMLInputElement>
}

export const LabeledInput: FC<LabeledInputProps> = forwardRef(
  (
    { label, onChange, name, type, placeholder, autoComplete = 'off', onBlur, ...props },
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <label>
        {label}
        <input
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          type={type}
          ref={ref}
          autoComplete={autoComplete}
          {...props}
        />
      </label>
    )
  }
)

export default LabeledInput
