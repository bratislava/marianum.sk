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
  ...props
}: CategoryFaqThemeCardProps) => {
  return (
    <CardBox {...props}>
      <CardContent className="h-[240px] justify-between">
        <div>
          <h5 className="text-heading text-h5 font-bold group-hover:underline">Headline</h5>
          {subtitle && <span>{subtitle}</span>}
        </div>
        <div>
          {/*<Button variant="plain-primary" className="inline-block" groupHover noPadding>*/}
          <Button variant="plain-primary" className="inline-block">
            Zobraziť viac
          </Button>
        </div>
      </CardContent>
    </CardBox>
  )
}

export const CategoryCard = CategoryFaqThemeCard as React.FC<CategoryCardProps>
export const FaqThemeCard = CategoryFaqThemeCard as React.FC<CategoryFaqThemeCardProps>
