import Image from 'next/image'
import React from 'react'

import Button from '../../atoms/Button'
import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'

type ServiceCardProps = {
  imageUrl: string
  imageAlt: string
  title: string
  subtitle: string
  linkHref: string
} & CardBoxProps

const ServiceCard = ({
  imageUrl,
  imageAlt,
  title,
  subtitle,
  linkHref,
  ...rest
}: ServiceCardProps) => {
  return (
    <CardBox {...rest}>
      <div className="aspect-w-1 aspect-h-1 w-full bg-gray">
        <Image src={imageUrl} alt={imageAlt} layout="fill" objectFit="contain" />
      </div>
      <CardContent className="justify-between">
        <div>
          <h5 className="line-clamp-3 group-hover:underline">{title}</h5>
          {subtitle && <span>{subtitle}</span>}
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

export default ServiceCard
