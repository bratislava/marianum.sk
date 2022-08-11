import React from 'react'

import Button from '../../atoms/Button'
import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'

type ServiceCardProps = {
  title: string
  subtitle: string
  linkHref: string
  imageUrl: string
  imageAlt: string
} & CardBoxProps

const ServiceCard = ({
  title,
  subtitle,
  linkHref,
  imageUrl,
  imageAlt,
  ...props
}: ServiceCardProps) => {
  return (
    <CardBox {...props}>
      <img src={imageUrl} alt={imageAlt} />
      <CardContent className="justify-between">
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

export default ServiceCard
