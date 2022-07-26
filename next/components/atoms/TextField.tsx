import cx from 'classnames'
import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react'

import FieldWrapper from './FieldWrapper'

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
      <FieldWrapper
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
      </FieldWrapper>
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
    <FieldWrapper
      id={id}
      label={label}
      className={className}
      hasLeftSlot={!!leftSlot}
      hasRightSlot={!!rightSlot}
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
    </FieldWrapper>
  )
}

export default TextField
