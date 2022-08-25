import cx from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useMemo, useRef } from 'react'
import { useHover } from 'usehooks-ts'

import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'
import FormatDate from '../../atoms/FormatDate'
import MLink from '../../atoms/MLink'

type ArticleCardProps = {
  imageUrl: string
  imageAlt: string
  title: string
  date: number | Date
  category?: { title: string; linkHref: string }
  linkHref: string
} & CardBoxProps

const ArticleCard = ({
  imageUrl,
  imageAlt,
  title,
  date,
  category,
  linkHref,
  ...rest
}: ArticleCardProps) => {
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
      <div className="aspect-w-[264] aspect-h-[148] w-full bg-gray">
        <Image src={imageUrl} alt={imageAlt} layout="fill" objectFit="cover" />
      </div>
      <CardContent className="gap-y-3">
        <span className="text-sm line-clamp-1">
          <span>
            <FormatDate value={formattedDate} format="articleCard" />
          </span>
          {category && (
              <>
                {' '}
                •{' '}
                <MLink noStyles href={category.linkHref} className="underline" ref={categoryHoverRef}>
                  {category.title}
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
