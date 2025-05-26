import cx from 'classnames'
import React, { useMemo, useRef } from 'react'
import { useHover } from 'usehooks-ts'

import CardBox, { CardBoxProps } from '@/components/atoms/Card/CardBox'
import CardContent from '@/components/atoms/Card/CardContent'
import FormatDate from '@/components/atoms/FormatDate'
import ImagePlaceholder from '@/components/atoms/ImagePlaceholder'
import MImage, { MImageImage } from '@/components/atoms/MImage'
import MLink from '@/components/atoms/MLink'
import {
  ArticleJobsCategoryEntityFragment,
  ArticleNewsCategoryEntityFragment,
  ArticlePressCategoryEntityFragment,
} from '@/graphql'

type ArticleCardProps = {
  image?: MImageImage | null
  title: string
  date: number | Date
  category?:
    | ArticleNewsCategoryEntityFragment
    | ArticlePressCategoryEntityFragment
    | ArticleJobsCategoryEntityFragment
    | null
    | undefined
  linkHref: string
} & CardBoxProps

const ArticleCard = ({ image, title, date, category, linkHref, ...rest }: ArticleCardProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const isLinkHovered = useHover(linkRef)

  const formattedDate = useMemo(() => new Date(date), [date])

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't trigger the `handleCardClick` function when link clicked.
    event.stopPropagation()
  }

  return (
    <CardBox {...rest} hover={isLinkHovered}>
      <div className="relative aspect-[264/148] w-full bg-gray">
        {image ? <MImage image={image} fill className="object-cover" /> : <ImagePlaceholder />}
      </div>
      <CardContent className="gap-y-3">
        <span className="line-clamp-1 text-sm">
          <span>
            <FormatDate value={formattedDate} format="articleCard" />
          </span>
          {category?.attributes && (
            <>
              {' '}
              • <span>{category.attributes.title}</span>
            </>
          )}
        </span>

        <h3
          className={cx('text-h5', {
            'group-hover:underline': isLinkHovered,
          })}
        >
          <MLink
            href={linkHref}
            ref={linkRef}
            onClick={handleLinkClick}
            noStyles
            className="after:absolute after:inset-0"
          >
            {title}
          </MLink>
        </h3>
      </CardContent>
    </CardBox>
  )
}

export default ArticleCard
