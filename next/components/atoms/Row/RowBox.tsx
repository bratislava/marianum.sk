import cx from 'classnames'
import { HTMLAttributes, PropsWithChildren, useContext } from 'react'
import { twMerge } from 'tailwind-merge'

import { sectionContext } from '@/components/layouts/SectionsWrapper'

export type RowBoxProps = {
  border?: boolean
  hover?: boolean
} & Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'onClick'>

const RowBox = ({
  border,
  className,
  hover = true,
  children,
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
