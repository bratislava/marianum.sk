import cx from 'classnames'
import Image from 'next/image'
import React, { useMemo } from 'react'
import { useHover } from 'use-hooks'

import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'
import MLink from '../../atoms/MLink'

type ArticleCardProps = {
  imageUrl: string
  imageAlt: string
  date: number | Date
  category: { title: string; linkHref: string }
  href: string
} & CardBoxProps

const ArticleCard = ({ imageUrl, imageAlt, date, category, href, ...rest }: ArticleCardProps) => {
  const [categoryHoverRef, isCategoryHovered] = useHover<HTMLAnchorElement>()

  // TODO: format date component
  const formattedDate = useMemo(() => new Date(date).toLocaleDateString(), [date])

  return (
    <CardBox {...rest} hover={!isCategoryHovered}>
      <div className="aspect-w-[264] aspect-h-[148] w-full bg-gray">
        <Image src={imageUrl} alt={imageAlt} layout="fill" objectFit="contain" />
      </div>
      <CardContent className="gap-y-3">
        <span className="text-sm">
          <span>{formattedDate}</span> •{' '}
          <MLink noStyles href={category.linkHref} className="underline" ref={categoryHoverRef}>
            {category.title}
          </MLink>
        </span>
        <MLink
          noStyles
          href={href}
          className={cx('text-h5 font-bold', {
            'group-hover:underline': !isCategoryHovered,
          })}
        >
          Headline
        </MLink>
      </CardContent>
    </CardBox>
  )
}

export default ArticleCard
