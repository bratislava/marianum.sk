import React from 'react'

import Button from '../../atoms/Button'
import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'

type CategoryCardProps = {
  title: string
  linkHref: string
} & CardBoxProps

type CategoryFaqThemeCardProps = CategoryCardProps & { subtitle?: string }

const CategoryFaqThemeCard = ({
  title,
  subtitle,
  linkHref,
  ...rest
}: CategoryFaqThemeCardProps) => {
  return (
    <CardBox {...rest}>
      <CardContent className="h-[240px] justify-between">
        <div>
          <h5 className="line-clamp-3 group-hover:underline">{title}</h5>
          {subtitle && <span className="block line-clamp-3">{subtitle}</span>}
        </div>
        <div>
          <Button variant="plain-primary" className="inline-block" noPadding>
            Zobraziť viac
          </Button>
        </div>
      </CardContent>
    </CardBox>
  )
}

export const CategoryCard = CategoryFaqThemeCard as React.FC<CategoryCardProps>
export const FaqThemeCard = CategoryFaqThemeCard as React.FC<CategoryFaqThemeCardProps>
