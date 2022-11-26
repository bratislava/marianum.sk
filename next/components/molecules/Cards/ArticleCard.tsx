import CardBox, { CardBoxProps } from '@components/atoms/Card/CardBox'
import CardContent from '@components/atoms/Card/CardContent'
import FormatDate from '@components/atoms/FormatDate'
import ImagePlaceholder from '@components/atoms/ImagePlaceholder'
import MImage, { MImageImage } from '@components/atoms/MImage'
import MLink from '@components/atoms/MLink'
import { ArticleNewsCategoryEntityFragment, ArticlePressCategoryEntityFragment } from '@graphql'
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
    | null
    | undefined
  linkHref: string
} & CardBoxProps

const ArticleCard = ({ image, title, date, category, linkHref, ...rest }: ArticleCardProps) => {
  const categoryHoverRef = useRef<HTMLAnchorElement>(null)
  const isCategoryHovered = useHover(categoryHoverRef)

  const formattedDate = useMemo(() => new Date(date), [date])

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't trigger the `handleCardClick` function when link clicked.
    event.stopPropagation()
  }

  return (
    <CardBox {...rest} hover={!isCategoryHovered}>
      <div className="aspect-w-[264] aspect-h-[148] w-full bg-gray">
        {image ? <MImage image={image} fill className="object-cover" /> : <ImagePlaceholder />}
      </div>
      <CardContent className="gap-y-3">
        <span className="text-sm line-clamp-1">
          <span>
            <FormatDate value={formattedDate} format="articleCard" />
          </span>
          {category?.attributes && (
            <>
              {' '}
              • <span>{category.attributes.title}</span>
              {/* TODO link to filtered articles */}
              {/* <MLink */}
              {/*  noStyles}
              {/*  href={category.attributes.slug} */}
              {/*  className="underline z-[1]" */}
              {/*  onClick={handleLinkClick} */}
              {/* > */}
              {/*  {category.attributes.title} */}
              {/* </MLink> */}
            </>
          )}
        </span>

        <h5
          className={cx({
            'group-hover:underline': !isCategoryHovered,
          })}
        >
          <MLink
            href={linkHref}
            onClick={handleLinkClick}
            noStyles
            className="after:absolute after:inset-0"
          >
            {title}
          </MLink>
        </h5>
      </CardContent>
    </CardBox>
  )
}

export default ArticleCard
