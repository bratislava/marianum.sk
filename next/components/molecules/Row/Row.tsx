import { ChevronRightIcon, OpenInNewIcon, PlaceIcon } from '@assets/icons'
import Button from '@components/atoms/Button'
import IconButton from '@components/atoms/IconButton'
import MLink from '@components/atoms/MLink'
import Tag from '@components/atoms/Tag'
import { DocumentCategoryEntityFragment } from '@graphql'
import { onEnterOrSpaceKeyDown } from '@utils/onEnterOrSpaceKeyDown'
import cx from 'classnames'
import { useRouter } from 'next/router'
import { Fragment, ReactNode } from 'react'

type RowProps = {
  title?: string
  titleId?: string
  metadata?: string[]
  tags?: string[]
  tagsPosition?: 'beside' | 'under'
  linkHref?: string
  isExternal?: boolean
  showUrl?: boolean
  category?: DocumentCategoryEntityFragment | null | undefined
  address?: string | null | undefined
  moreContent?: ReactNode
  button?: ReactNode
  arrowInCorner?: boolean
  border?: boolean
}

const Row = ({
  title,
  titleId,
  metadata,
  tags = [],
  tagsPosition = 'beside',
  linkHref,
  isExternal = false,
  showUrl = false,
  category,
  address,
  moreContent,
  button = null,
  arrowInCorner = false,
  border = true,
}: RowProps) => {
  const router = useRouter()

  const linkProps = linkHref
    ? {
        role: 'link',
        tabIndex: -1,
        onClick: () => router.push(linkHref),
        onKeyDown: onEnterOrSpaceKeyDown(() => router.push(linkHref)),
      }
    : null

  return (
    <div
      {...linkProps}
      aria-label={title}
      className={cx('group relative flex w-full items-center bg-white py-3 px-4 md:py-4 md:px-5', {
        'cursor-pointer': linkHref,
        'border border-border': border,
      })}
    >
      <div className="grow gap-y-1.5">
        {category?.attributes && (
          <MLink
            // TODO add proper link for category
            href="#"
            noStyles
            className="text-sm text-primary underline hover:text-primary-dark"
          >
            {category.attributes.title}
          </MLink>
        )}

        <div
          className={cx('flex gap-x-4 gap-y-1.5', {
            'items-start pb-1 md:flex-col': tagsPosition === 'under',
            'items-center': tagsPosition === 'beside',
          })}
        >
          {title && (
            <h5
              className={cx('w-fit text-left text-h5 text-foreground-heading', {
                'group-hover:underline group-focus:underline': linkHref,
              })}
              id={titleId}
            >
              {title}
            </h5>
          )}
          {tags.length > 0 && (
            <div className="flex gap-4">
              {tags.map((tag) => (
                <Tag key={tag} className="bg-background-beige">
                  {tag}
                </Tag>
              ))}
            </div>
          )}
        </div>

        <div className="space-x-3 text-sm empty:hidden">
          {showUrl && linkHref && (
            <>
              <span>{linkHref}</span>
              {metadata && metadata.length > 0 && <span>&bull;</span>}
            </>
          )}
          {metadata?.map((metadataItem, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={i}>
              <span>{metadataItem}</span>
              {i !== metadata.length - 1 && <span>•</span>}
            </Fragment>
          ))}
        </div>

        {address && (
          <div className="flex items-center gap-x-2">
            <span className="text-primary">
              <PlaceIcon />
            </span>
            <div className="whitespace-pre-wrap">{address}</div>
          </div>
        )}

        {moreContent && <div className="pt-2 text-left">{moreContent}</div>}
      </div>

      <div className={cx('flex gap-x-5', { 'items-center': !arrowInCorner })}>
        {button && <div className="hidden md:flex">{button}</div>}
        {linkHref &&
          (isExternal ? (
            <>
              {/* desktop button */}
              <Button
                href={linkHref}
                variant="plain-secondary"
                startIcon={<OpenInNewIcon />}
                className="hidden md:flex"
              >
                {/* TODO translations */}
                Zobraziť web
              </Button>
              {/* mobile buttom */}
              <IconButton
                href={linkHref}
                aria-label={title}
                variant="plain-secondary"
                className="-mr-2 md:hidden"
              >
                <OpenInNewIcon />
              </IconButton>
            </>
          ) : (
            // eslint-disable-next-line jsx-a11y/tabindex-no-positive
            <IconButton href={linkHref} aria-label={title} className="-mr-2 hidden md:flex">
              <ChevronRightIcon />
            </IconButton>
          ))}
      </div>
    </div>
  )
}

export default Row
