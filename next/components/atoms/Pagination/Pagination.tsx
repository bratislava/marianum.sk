import cx from 'classnames'
import React, { ReactNode } from 'react'

import ArrowLeftIcon from '../../../assets/arrow_back.svg'
import ArrowRightIcon from '../../../assets/arrow_forward.svg'
import IconButton from '../IconButton'
import usePagination from './usePagination'

type PaginationProps = {
  selectedPage: number
  count: number
  className?: string
  onChange?: (value: number) => void
}

/**
 * Slightly edited version of example from https://mui.com/material-ui/react-pagination/#usepagination + accessibility
 * as implemented in @mui/material.
 */
const Pagination = ({ count, selectedPage, className, onChange = () => {} }: PaginationProps) => {
  const { items } = usePagination({
    count,
    page: selectedPage,
    onChange: (event, value) => {
      // When not blurred the button stays focused and is confusing.
      ;(event.target as HTMLButtonElement).blur()
      onChange(value)
    },
  })
  return (
    <nav className={className}>
      <ul className="flex items-center gap-x-1">
        {items.map(
          ({ page, type, selected, disabled, onPress, 'aria-current': ariaCurrent }, index) => {
            let children: ReactNode = null

            // eslint-disable-next-line unicorn/prefer-switch
            if (type === 'start-ellipsis' || type === 'end-ellipsis') {
              children = '…'
            } else if (type === 'page') {
              children = (
                <IconButton
                  variant={selected ? 'pagination-selected' : 'pagination'}
                  disabled={disabled}
                  onPress={onPress}
                  aria-current={ariaCurrent}
                  aria-label={`Ísť na stranu ${page}`} // TODO: Translations.
                >
                  {page}
                </IconButton>
              )
            } else if (type === 'previous' || type === 'next') {
              let icon: ReactNode
              let ariaLabel = ''
              if (type === 'previous') {
                icon = <ArrowLeftIcon />
                ariaLabel = 'Ísť na predchádzajúcu stranu' // TODO: Translations.
              }
              if (type === 'next') {
                icon = <ArrowRightIcon />
                ariaLabel = 'Ísť na ďalšiu stranu' // TODO: Translations.
              }

              children = (
                <IconButton
                  size="small"
                  variant="primary"
                  disabled={disabled}
                  onPress={onPress}
                  aria-label={ariaLabel}
                >
                  {icon}
                </IconButton>
              )
            }

            return (
              <li
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className={cx({
                  'mx-[14px] text-sm font-semibold':
                    type === 'start-ellipsis' || type === 'end-ellipsis',
                  'mr-2': type === 'previous',
                  'ml-2': type === 'next',
                })}
              >
                {children}
              </li>
            )
          },
        )}
      </ul>
    </nav>
  )
}

export default Pagination
