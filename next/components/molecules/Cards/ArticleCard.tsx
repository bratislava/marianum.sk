import cx from 'classnames'
import { useRouter } from 'next/router'
import React, { useMemo, useRef } from 'react'
import { useHover } from 'usehooks-ts'

import { UploadFile } from '../../../graphql'
import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'
import MImage from '../../atoms/MImage'
import MLink from '../../atoms/MLink'

type ArticleCardProps = {
  image: UploadFile
  title: string
  date: number | Date
  category?: { title: string; linkHref: string }
  linkHref: string
} & CardBoxProps

const ArticleCard = ({ image, title, date, category, linkHref, ...rest }: ArticleCardProps) => {
  const router = useRouter()
  const categoryHoverRef = useRef<HTMLAnchorElement>(null)
  const isCategoryHovered = useHover(categoryHoverRef)

  // TODO: MD-170 Format date component
  const formattedDate = useMemo(() => new Date(date).toLocaleDateString(), [date])

  const handleCardClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(linkHref)
  }

  return (
    <CardBox {...rest} hover={!isCategoryHovered} onClick={handleCardClick}>
      <div className="aspect-w-[264] aspect-h-[148] w-full bg-gray">
        <MImage image={image} layout="fill" objectFit="cover" />
      </div>
      <CardContent className="gap-y-3">
        <span className="text-sm line-clamp-1">
          <span>{formattedDate}</span>
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
