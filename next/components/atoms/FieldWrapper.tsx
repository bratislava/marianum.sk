import cx from 'classnames'
import { ReactNode } from 'react'

type FieldWrapperProps = {
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

const FieldWrapper = ({
  className,
  leftSlot = false,
  rightSlot = false,
  children,
  disabled = false,
  error = false,
  label,
  id,
  required = false,
}: FieldWrapperProps) => {
  return (
    <div className="w-full">
      <div className="flex w-full gap-1 text-sm font-semibold">
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
          'border-border hover:border-border-dark group-focus:border-border-dark focus-within:border-border-dark bg-border bg-opacity-25 text-foreground-disabled':
            disabled,
          'border-error': error,
          'border-border hover:border-border-dark group-focus:border-border-dark focus-within:border-border-dark':
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

export default FieldWrapper
