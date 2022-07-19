import cx from 'classnames'
import React from 'react'

import ChevronRightIcon from '../../assets/chevron_right.svg'
import OpenInNewIcon from '../../assets/open_in_new.svg'
import PlaceIcon from '../../assets/place.svg'
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
}: IRowProps) => {
  return (
    <div className="relative flex w-full items-center border border-borderDefault bg-white py-3 px-4 md:py-4 md:px-5">
      <div className="grow space-y-1.5">
        {category && (
          <MLink
            href="#"
            noStyles
            className="text-sm text-primary underline hover:text-primaryDark"
          >
            {category}
          </MLink>
        )}

        <h5 className="text-h5 text-heading">{title}</h5>

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
              {i !== metadata.length - 1 && <span>&bull;</span>}
            </React.Fragment>
          ))}
        </div>

        {address && (
          <div className="flex items-center gap-x-2">
            <span className="fill-current text-primary">
              <PlaceIcon />
            </span>
            {address}
          </div>
        )}

        {moreContent && <div className="pt-6 text-md">{moreContent}</div>}
      </div>

      <div className={cx('flex gap-x-5', { 'items-center': !arrowInCorner })}>
        <span className="hidden md:flex">{button}</span>
        {link &&
          (isExternal ? (
            <>
              <Button
                variant="plain-secondary"
                startIcon={<OpenInNewIcon />}
                className="hidden md:flex"
              >
                Zobraziť web
              </Button>
              <IconButton href={link} variant="plain-secondary" className="-mr-2 md:hidden">
                <OpenInNewIcon />
              </IconButton>
            </>
          ) : (
            <IconButton href={link} className="-mr-2 hidden md:flex">
              <ChevronRightIcon />
            </IconButton>
          ))}
      </div>
    </div>
  )
}

export default Row
