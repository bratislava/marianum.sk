import cx from 'classnames'
import { useRouter } from 'next/router'
import React, { useMemo, useRef } from 'react'
import { useHover } from 'usehooks-ts'

import {
  ArticleNewsCategoryEntityFragment,
  ArticlePressCategoryEntityFragment,
} from '../../../graphql'
import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'
import FormatDate from '../../atoms/FormatDate'
import ImagePlaceholder from '../../atoms/ImagePlaceholder'
import MImage, { MImageImage } from '../../atoms/MImage'
import MLink from '../../atoms/MLink'

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
  const router = useRouter()
  const categoryHoverRef = useRef<HTMLAnchorElement>(null)
  const isCategoryHovered = useHover(categoryHoverRef)

  const formattedDate = useMemo(() => new Date(date), [date])

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't trigger the `handleCardClick` function when link clicked.
    event.stopPropagation()
  }

  const handleCardClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(linkHref)
  }

  return (
    <CardBox {...rest} hover={!isCategoryHovered} onClick={handleCardClick}>
      <div className="aspect-w-[264] aspect-h-[148] w-full bg-gray">
        <MLink href={linkHref} tabIndex={-1} onClick={handleLinkClick} noStyles>
          {image ? <MImage image={image} layout="fill" objectFit="cover" /> : <ImagePlaceholder />}
        </MLink>
      </div>
      <CardContent className="gap-y-3">
        <span className="text-sm line-clamp-1">
          <span>
            <FormatDate value={formattedDate} format="articleCard" />
          </span>
          {category?.attributes && (
            <>
              {' '}
              •{' '}
              <MLink
                noStyles // TODO link to filtered articles
                href={category.attributes.slug}
                className="underline"
                onClick={handleLinkClick}
              >
                {category.attributes.title}
              </MLink>
            </>
          )}
        </span>

        <h5
          className={cx({
            'group-hover:underline': !isCategoryHovered,
          })}
        >
          <MLink href={linkHref} onClick={handleLinkClick} noStyles>
            {title}
          </MLink>
        </h5>
      </CardContent>
    </CardBox>
  )
}

export default ArticleCard
