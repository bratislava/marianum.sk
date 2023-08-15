import CardBox, { CardBoxProps } from '@components/atoms/Card/CardBox'
import CardContent from '@components/atoms/Card/CardContent'
import FormatDate from '@components/atoms/FormatDate'
import ImagePlaceholder from '@components/atoms/ImagePlaceholder'
import MImage, { MImageImage } from '@components/atoms/MImage'
import MLink from '@components/atoms/MLink'
import {
  ArticleJobsCategoryEntityFragment,
  ArticleNewsCategoryEntityFragment,
  ArticlePressCategoryEntityFragment,
} from '@graphql'
import cx from 'classnames'
import React, { useMemo, useRef } from 'react'
import { useHover } from 'usehooks-ts'

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
      <div className="aspect-h-[148] aspect-w-[264] w-full bg-gray">
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
              {/* TODO link to filtered articles */}
              {/* <MLink */}
              {/*  noStyles */}
              {/*  href={category.attributes.slug} */}
              {/*  className="z-[1] underline" */}
              {/*  onClick={handleLinkClick} */}
              {/* > */}
              {/*  {category.attributes.title} */}
              {/* </MLink> */}
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
