import Image from 'next/image'
import React from 'react'

import CheckIcon from '../../../assets/check.svg'
import Button from '../../atoms/Button'
import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'

type PackageCardProps = {
  imageUrl: string
  imageAlt: string
  name: string
  priceFrom: number // TODO: or string?
  claims: string[]
  linkHref: string
} & CardBoxProps

const PackageCard = ({
  imageUrl,
  imageAlt,
  name,
  priceFrom,
  claims,
  linkHref,
  ...props
}: PackageCardProps) => {
  return (
    <CardBox {...props}>
      <div className="aspect-w-[360] aspect-h-[200] w-full bg-gray">
        <Image src={imageUrl} alt={imageAlt} layout="fill" objectFit="contain" />
      </div>
      <CardContent className="justify-between">
        <div>
          <h5 className="line-clamp-3 group-hover:underline">{name}</h5>
          <div className="mb-4">od {priceFrom}€</div>
          {claims.length > 0 && (
            <ul className="mb-6">
              {claims.map((claim, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index} className="flex items-center">
                  <span className="mr-2 text-primary">
                    <CheckIcon />
                  </span>
                  {claim}
                </li>
              ))}
            </ul>
          )}
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

export default PackageCard
