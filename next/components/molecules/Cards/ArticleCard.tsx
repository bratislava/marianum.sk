import Image from 'next/image'

import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'
import MLink from '../../atoms/MLink'
import { useMemo } from 'react'
import { useHover } from 'use-hooks'
import cx from 'classnames'

type ArticleCardProps = {
  imageUrl: string
  date: number | Date
  category: { title: string; linkHref: string }
  href: string
} & CardBoxProps

const ArticleCard = ({ imageUrl, date, category, href, ...rest }: ArticleCardProps) => {
  const [categoryHoverRef, isCategoryHovered] = useHover<HTMLAnchorElement>()

  // TODO format date component
  const formattedDate = useMemo(() => new Date(date).toLocaleDateString('de-DE'), [date])
  return (
    <CardBox {...rest} hover={!isCategoryHovered}>
      {imageUrl && <img src={imageUrl} />}
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
          className={cx('text-h5 font-bold text-heading', {
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
