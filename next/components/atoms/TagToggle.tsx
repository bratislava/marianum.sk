import cx from 'classnames'
import { useRef } from 'react'
import { useToggleButton } from 'react-aria'
import { ToggleProps, useToggleState } from 'react-stately'

type TagButtonProps = { className?: string } & ToggleProps

const TagButton = (props: TagButtonProps) => {
  const ref = useRef<HTMLButtonElement | null>(null)
  const state = useToggleState(props)
  const { buttonProps } = useToggleButton(props, state, ref)
  const { children, className } = props
  const { isSelected } = state
  return (
    <button
      ref={ref}
      type="button"
      className={cx(
        'flex h-8 w-fit cursor-pointer select-none items-center whitespace-nowrap rounded-full border px-3 text-sm font-semibold focus:outline-2 focus:outline-primary',
        {
          'border-primary bg-primary text-white': isSelected,
          'border-border bg-white hover:text-primary': !isSelected,
        },
        className,
      )}
      {...buttonProps}
    >
      {children}
    </button>
  )
}

export default TagButton
