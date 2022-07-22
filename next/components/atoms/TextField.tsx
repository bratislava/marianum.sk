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
    <div className="w-full">
      <div className="flex gap-1 text-sm font-semibold">
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
  // eslint-disable-next-line react/destructuring-assignment
  if (props.area) {
    const {
      id,
      area,
      rows = 6,
      label,
      className,
      disabled = false,
      error = false,
      required = false,
      ...rest
    } = props
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
          required={required}
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

  const {
    id,
    area,
    leftSlot = null,
    rightSlot = null,
    label,
    className,
    disabled = false,
    error = false,
    required = false,
    ...rest
  } = props

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
        required={required}
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
