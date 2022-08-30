import cx from 'classnames'
import { useRouter } from 'next/router'
import React from 'react'

import ChevronRightIcon from '../../assets/chevron_right.svg'
import OpenInNewIcon from '../../assets/open_in_new.svg'
import PlaceIcon from '../../assets/place.svg'
import { onEnterOrSpaceKeyDown } from '../../utils/onEnterOrSpaceKeyDown'
import Button from '../atoms/Button'
import IconButton from '../atoms/IconButton'
import MLink from '../atoms/MLink'

interface IRowProps {
  title: string
  metadata?: string[]
  link?: string
  isExternal?: boolean
  showUrl?: boolean
  category?: string
  address?: string
  moreContent?: React.ReactNode
  button?: React.ReactNode
  arrowInCorner?: boolean
  number?: number
  border?: boolean
}

const Row = ({
  title,
  metadata,
  link = '',
  isExternal = false,
  showUrl = false,
  category,
  address,
  moreContent,
  button = null,
  arrowInCorner = false,
  number,
  border = true,
}: IRowProps) => {
  const router = useRouter()

  const linkProps = link
    ? {
        role: 'link',
        tabIndex: -1,
        onClick: () => router.push(link),
        onKeyDown: onEnterOrSpaceKeyDown(() => router.push(link)),
      }
    : null

  return (
    <div
      {...linkProps}
      aria-label={title}
      className={cx('group relative flex w-full items-center bg-white py-3 px-4 md:py-4 md:px-5', {
        'cursor-pointer': link,
        'border border-border': border,
      })}
    >
      {number && <div className="pr-8 pl-1 text-h1 font-bold text-primary">{number}</div>}
      <div className="grow space-y-1.5">
        {category && (
          <MLink
            href="#"
            noStyles
            className="text-sm text-primary underline hover:text-primary-dark"
          >
            {category}
          </MLink>
        )}

        <h5
          className={cx('w-fit text-left text-h5 text-foreground-heading', {
            'group-hover:underline group-focus:underline': link,
          })}
        >
          {title}
        </h5>

        <div className="space-x-3 text-sm empty:hidden">
          {showUrl && link && (
            <>
              <span>{link}</span>
              {metadata && metadata.length > 0 && <span>&bull;</span>}
            </>
          )}
          {metadata?.map((metadataItem, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={i}>
              <span>{metadataItem}</span>
              {i !== metadata.length - 1 && <span>•</span>}
            </React.Fragment>
          ))}
        </div>

        {address && (
          <div className="flex items-center gap-x-2">
            <span className="text-primary">
              <PlaceIcon />
            </span>
            {address}
          </div>
        )}

        {moreContent && <div className="pt-2 text-left">{moreContent}</div>}
      </div>

      <div className={cx('flex gap-x-5', { 'items-center': !arrowInCorner })}>
        {button && <div className="hidden md:flex">{button}</div>}
        {link &&
          (isExternal ? (
            <>
              {/* desktop button */}
              <Button
                href={link}
                variant="plain-secondary"
                startIcon={<OpenInNewIcon />}
                className="hidden md:flex"
              >
                Zobraziť web
              </Button>
              {/* mobile buttom */}
              <IconButton
                href={link}
                aria-label={title}
                variant="plain-secondary"
                className="-mr-2 md:hidden"
              >
                <OpenInNewIcon />
              </IconButton>
            </>
          ) : (
            // eslint-disable-next-line jsx-a11y/tabindex-no-positive
            <IconButton href={link} aria-label={title} className="-mr-2 hidden md:flex">
              <ChevronRightIcon />
            </IconButton>
          ))}
      </div>
    </div>
  )
}

export default Row
