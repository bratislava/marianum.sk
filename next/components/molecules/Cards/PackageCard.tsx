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
      <img src={imageUrl} alt={imageAlt} />
      <CardContent className="justify-between">
        <div>
          <h5 className="text-heading text-h5 font-bold group-hover:underline">{name}</h5>
          <div className="mb-4">od {priceFrom}€</div>
          {claims.length > 0 && (
            <ul className="mb-6">
              {claims.map((claim) => (
                <li className="flex">
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
          {/* <Button variant="plain-primary" className="inline-block" groupHover noPadding> */}
          <Button variant="plain-primary" className="inline-block">
            Zobraziť viac
          </Button>
        </div>
      </CardContent>
    </CardBox>
  )
}

export default PackageCard
