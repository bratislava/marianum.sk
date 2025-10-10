import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, ReactNode, useId } from 'react'

import FieldWrapper from '@/components/atoms/FieldWrapper'
import cn from '@/utils/cn'

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
  id?: string
  label?: string
  inputClassName?: string
  isLarge?: boolean
}

type TextFieldProps = CommonProps & AreaOrInputConditionalProps

const TextField = forwardRef<HTMLTextAreaElement & HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const generatedId = useId()
    // eslint-disable-next-line react/destructuring-assignment
    const generatedOrProvidedId = props.id ?? generatedId
    // eslint-disable-next-line react/destructuring-assignment
    if (props.area) {
      const {
        area,
        rows = 6,
        label,
        className,
        inputClassName,
        disabled = false,
        error = false,
        required = false,
        isLarge = false,
        ...rest
      } = props

      return (
        <FieldWrapper
          id={generatedOrProvidedId}
          label={label}
          className={className}
          disabled={disabled}
          error={error}
          required={required}
        >
          <textarea
            {...rest}
            id={generatedOrProvidedId}
            rows={rows}
            disabled={disabled}
            required={required}
            className={cn(
              'base-focus-ring min-h-10 w-full resize-y bg-transparent px-4 py-[6px]',
              {
                'text-foreground-disabled': disabled,
                'placeholder:text-foreground-placeholder':
                  !inputClassName?.includes('placeholder:'),
                'h-16': isLarge,
              },
              inputClassName,
            )}
            ref={ref}
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
      inputClassName,
      error = false,
      required = false,
      isLarge = false,
      ...rest
    } = props

    return (
      <FieldWrapper
        id={generatedOrProvidedId}
        label={label}
        className={className}
        hasLeftSlot={!!leftSlot}
        hasRightSlot={!!rightSlot}
        disabled={disabled}
        error={error}
        required={required}
      >
        {leftSlot && (
          <div className={cn('shrink-0 grow-0', { 'p-3': isLarge, 'p-2': !isLarge })}>
            {leftSlot}
          </div>
        )}
        <input
          {...rest}
          id={generatedOrProvidedId}
          disabled={disabled}
          required={required}
          className={cn(
            'base-focus-ring w-full bg-transparent',
            {
              'text-foreground-disabled': disabled,
              'pl-4': !leftSlot,
              'pr-4': !rightSlot,
              'placeholder:text-foreground-placeholder': !inputClassName?.includes('placeholder:'),
              'h-16': isLarge,
              'h-10': !isLarge,
            },
            inputClassName,
          )}
          ref={ref}
        />
        {rightSlot && <div className={cn('shrink-0 grow-0', { 'p-3': isLarge })}>{rightSlot}</div>}
      </FieldWrapper>
    )
  },
)

export default TextField
