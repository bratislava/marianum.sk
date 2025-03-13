import cx from 'classnames'
import { HTMLAttributes, PropsWithChildren, useContext } from 'react'
import { twMerge } from 'tailwind-merge'

import { sectionContext } from '@/components/layouts/SectionsWrapper'

export type RowBoxProps = {
  border?: boolean
  hover?: boolean
  applyFocusStyles?: boolean
} & Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'onClick'>

/**
 * This component manages border styles, hover effects, and focus rings for row-like components
 */

const RowBox = ({
  border,
  className,
  hover = true,
  children,
  applyFocusStyles = true,
  onClick = () => {},
}: PropsWithChildren<RowBoxProps>) => {
  const { border: contextBorder } = useContext(sectionContext)

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={twMerge(
        cx('flex w-full flex-col bg-white', {
          'border border-border': border ?? contextBorder,
          'hover:shadow-card': hover,
          // When the card is focused, hide all its descendants’ focus rings (= focus rings of any links within the card) except the card’s focus ring
          // This needs revisiting when we need more focusable elements in a card
          'outline-none ring-offset-2 transition focus-within:[&:has(:focus-visible)]:ring [&_*]:outline-none [&_*]:ring-transparent [&_a]:ring-offset-transparent':
            applyFocusStyles, // TODO Temporary workaround to prevent DocumentRow focus styles from applying to the entire row
          // The ideal solution is to refactor DocumentRow to have a single focusable element instead of multiple
          // This would allow us to apply focus styles to the whole card naturally, eliminating the need for this prop
        }),
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default RowBox
