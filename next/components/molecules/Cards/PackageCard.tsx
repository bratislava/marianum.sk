import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import CheckIcon from '../../../assets/check.svg'
import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'
import FormatCurrency from '../../atoms/FormatCurrency'
import MLink from '../../atoms/MLink'

type PackageCardProps = {
  imageUrl: string
  imageAlt: string
  name: string
  priceFrom: number
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
  const router = useRouter()

  const handleCardClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(linkHref)
  }

  return (
    <CardBox {...props} onClick={handleCardClick}>
      <div className="aspect-w-[360] aspect-h-[200] w-full bg-gray">
        <Image src={imageUrl} alt={imageAlt} layout="fill" objectFit="cover" />
      </div>
      <CardContent className="justify-between">
        <div>
          <h5 className="line-clamp-3 group-hover:underline">{name}</h5>
          {/* TODO: Translation */}
          <div className="mb-4 font-semibold">
            od <FormatCurrency value={priceFrom} />
          </div>
          {claims.length > 0 && (
            <ul className="mb-6">
              {claims.map((claim, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index} className="flex items-center text-sm">
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
          <MLink href={linkHref} noArrow className="inline-block">
            {/* TODO: Translation */}
            Zobraziť viac
          </MLink>
        </div>
      </CardContent>
    </CardBox>
  )
}

export default PackageCard
