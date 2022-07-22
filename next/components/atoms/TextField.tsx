import cx from 'classnames'
import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react'

type TextFieldWrapperProps = {
  className?: string
  leftSlot?: boolean
  rightSlot?: boolean
  disabled?: boolean
  error?: boolean
  children?: ReactNode
  id: string
  label?: string
  required?: boolean
}

const TextFieldWrapper = ({
  className,
  leftSlot = false,
  rightSlot = false,
  children,
  disabled = false,
  error = false,
  label,
  id,
  required = false,
}: TextFieldWrapperProps) => {
  return (
    <div>
      <div className="flex text-sm gap-1 font-semibold">
        {label && (
          <label className="mb-1 block" htmlFor={id}>
            {label}
          </label>
        )}
        {required && <div className="text-error">*</div>}
      </div>

      <div
        className={cx('flex border items-center w-full', className, {
          'cursor-not-allowed select-none pointer-events-none': disabled,
          'border-border hover:border-border-dark focus-within:border-border-dark bg-border bg-opacity-25 text-foreground-disabled':
            disabled,
          'border-error': error,
          'border-border hover:border-border-dark focus-within:border-border-dark':
            !error && !disabled,
          'pl-1': leftSlot,
          'pr-1': rightSlot,
        })}
      >
        {children}
      </div>
    </div>
  )
}

type AreaOrInputConditionalProps =
  // textarea props
  | (DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
      area: true
      rows?: number
    })
  // input props
  | (DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
      area?: never | undefined | false
      leftSlot?: ReactNode
      rightSlot?: ReactNode
    })

// common for textarea and input
type CommonProps = {
  error?: boolean
  id: string
  label?: string
}

type TextFieldProps = CommonProps & AreaOrInputConditionalProps

const TextField = (props: TextFieldProps) => {
  const { id, area, label, disabled = false, error = false, required = false } = props

  if (area) {
    const { className, rows = 6, ...rest } = props
    return (
      <TextFieldWrapper
        id={id}
        label={label}
        className={className}
        disabled={disabled}
        error={error}
        required={required}
      >
        <textarea
          {...rest}
          rows={rows}
          disabled={disabled}
          className={cx(
            'px-4 resize-y min-h-10 py-[6px] w-full outline-none placeholder:text-foreground-placeholder',
            {
              'text-foreground-disabled': disabled,
            },
          )}
        />
      </TextFieldWrapper>
    )
  }

  const { className, leftSlot = null, rightSlot = null, ...rest } = props
  return (
    <TextFieldWrapper
      id={id}
      label={label}
      className={className}
      leftSlot={!!leftSlot}
      rightSlot={!!rightSlot}
      disabled={disabled}
      error={error}
      required={required}
    >
      {leftSlot && <div className="shrink-0 grow-0">{leftSlot}</div>}
      <input
        {...rest}
        disabled={disabled}
        className={cx('h-10 w-full outline-none placeholder:text-foreground-placeholder', {
          'text-foreground-disabled': disabled,
          'pl-4': !leftSlot,
          'pr-4': !rightSlot,
        })}
      />
      {rightSlot && <div className="shrink-0 grow-0">{rightSlot}</div>}
    </TextFieldWrapper>
  )
}

export default TextField
