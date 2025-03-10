import cx from 'classnames'
import { Fragment, ReactNode, useRef } from 'react'
import { useHover } from 'usehooks-ts'

import { ChevronRightIcon, PlaceIcon } from '@/assets/icons'
import IconButton from '@/components/atoms/IconButton'
import RowBox, { RowBoxProps } from '@/components/atoms/Row/RowBox'
import RowContent from '@/components/atoms/Row/RowContent'
import RowMoreContent from '@/components/atoms/Row/RowMoreContent'
import Tag from '@/components/atoms/Tag'
import { DocumentCategoryEntityFragment } from '@/graphql'

export type RowProps = {
  title?: string
  titleId?: string
  metadata?: string[]
  tags?: string[]
  tagsPosition?: 'beside' | 'under'
  linkHref?: string
  showUrl?: boolean
  category?: DocumentCategoryEntityFragment | null | undefined
  address?: string | null | undefined
  moreContent?: ReactNode
  button?: ReactNode
  /*
   * Since linkButton replaces standard link, it must implement the same behavior, especially for accessibility
   * (aria-labelledby={titleId}) and classes to expand link to the whole component ("after:absolute after:inset-0").
   */
  linkButton?: ReactNode
  variant?: 'gaps' | 'dividers'
  applyFocusStyles?: boolean
} & RowBoxProps

const Row = ({
  title,
  titleId,
  metadata,
  tags = [],
  tagsPosition = 'beside',
  linkHref,
  showUrl = false,
  category,
  address,
  moreContent,
  button = null,
  linkButton = null,
  variant = 'gaps',
  ...rest
}: RowProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const isLinkHovered = useHover(linkRef)

  return (
    <RowBox hover={variant === 'gaps' && !!linkHref} {...rest}>
      {/* When some other clickable element is hovered, display shadow but not other "hover styles" */}
      <RowContent hover={isLinkHovered} className={variant === 'dividers' ? 'gap-6 md:px-0' : ''}>
        <div className="flex grow flex-col gap-y-1.5">
          {category?.attributes && <div className="text-primary">{category.attributes.title}</div>}

          <div
            className={cx('flex gap-x-4 gap-y-1.5', {
              'flex-col items-start pb-1': tagsPosition === 'under',
              'items-center': tagsPosition === 'beside',
            })}
          >
            {title && (
              <h3
                className={cx('w-fit text-left text-h5 text-foreground-heading', {
                  'group-hover:underline group-focus:underline': linkHref,
                })}
                id={titleId}
              >
                {title}
              </h3>
            )}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-x-4 gap-y-2">
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
        </div>

        <div className="flex gap-x-5">
          {button && <div className="z-[1] hidden md:flex">{button}</div>}
          {linkHref &&
            (linkButton || (
              <IconButton
                href={linkHref}
                ref={linkRef}
                aria-labelledby={titleId}
                className="-mr-2 after:absolute after:inset-0"
              >
                <ChevronRightIcon />
              </IconButton>
            ))}
        </div>
      </RowContent>

      {moreContent && <RowMoreContent>{moreContent}</RowMoreContent>}
    </RowBox>
  )
}

export default Row
