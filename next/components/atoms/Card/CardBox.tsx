import { HTMLAttributes, PropsWithChildren, useContext } from 'react'

import { sectionContext } from '@/components/layouts/SectionsWrapper'
import cn from '@/utils/cn'

export type CardBoxProps = {
  border?: boolean
  hover?: boolean
} & Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'onClick'>

/**
 * This component manages border styles, hover effects, and focus rings for card-like components
 */

const CardBox = ({
  border,
  className,
  hover = true,
  children,
  onClick = () => {},
}: PropsWithChildren<CardBoxProps>) => {
  const { border: contextBorder } = useContext(sectionContext)

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={cn(
        // When the card is focused, hide all its descendants’ focus rings (= focus rings of any links within the card) except the card’s focus ring
        // This needs revisiting when we need more focusable elements in a card
        'outline-none ring-offset-2 transition focus-within:[&:has(:focus-visible)]:ring [&_*]:outline-none [&_*]:ring-transparent [&_a]:ring-offset-transparent',
        'relative flex flex-col bg-white',
        {
          'border border-border': border ?? contextBorder,
          'group cursor-pointer hover:shadow-card': hover,
        },
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default CardBox
