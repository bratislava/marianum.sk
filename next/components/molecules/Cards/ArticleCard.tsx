import cx from 'classnames'
import { useRouter } from 'next/router'
import React, { useMemo, useRef } from 'react'
import { useHover } from 'usehooks-ts'

import { ArticleCategoryEntityFragment } from '../../../graphql'
import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'
import FormatDate from '../../atoms/FormatDate'
import MImage, { MImageImage } from '../../atoms/MImage'
import MLink from '../../atoms/MLink'

type ArticleCardProps = {
  image?: MImageImage | null
  title: string
  date: number | Date
  category?: ArticleCategoryEntityFragment | null | undefined
  linkHref: string
} & CardBoxProps

const ArticleCard = ({ image, title, date, category, linkHref, ...rest }: ArticleCardProps) => {
  const router = useRouter()
  const categoryHoverRef = useRef<HTMLAnchorElement>(null)
  const isCategoryHovered = useHover(categoryHoverRef)

  const formattedDate = useMemo(() => new Date(date), [date])

  const handleCardClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(linkHref)
  }

  return (
    <CardBox {...rest} hover={!isCategoryHovered} onClick={handleCardClick}>
      {image && (
        <div className="aspect-w-[264] aspect-h-[148] w-full bg-gray">
          <MImage image={image} layout="fill" objectFit="cover" />
        </div>
      )}
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
                noStyles // TODO link
                href={category.attributes.slug}
                className="underline"
                ref={categoryHoverRef}
              >
                {category.attributes.title}
              </MLink>
            </>
          )}
        </span>
        <MLink noStyles href={linkHref}>
          <h5
            className={cx({
              'group-hover:underline': !isCategoryHovered,
            })}
          >
            {title}
          </h5>
        </MLink>
      </CardContent>
    </CardBox>
  )
}

export default ArticleCard
