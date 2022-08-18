import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import OpenInNewIcon from '../../../assets/open_in_new.svg'
import Button from '../../atoms/Button'
import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'

type PartnerCardProps = {
  title: string
  linkHref: string
  imageUrl: string
  imageAlt: string
} & CardBoxProps

const PartnerCard = ({ title, linkHref, imageUrl, imageAlt, ...rest }: PartnerCardProps) => {
  const router = useRouter()

  const handleCardClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(linkHref)
  }

  return (
    <CardBox {...rest} onClick={handleCardClick}>
      <CardContent className="justify-between gap-y-4">
        <div className="aspect-w-[240] aspect-h-[72] w-full bg-gray md:aspect-w-[216] md:aspect-h-[83]">
          <Image src={imageUrl} alt={imageAlt} layout="fill" objectFit="contain" />
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <h5 className="line-clamp-3 group-hover:underline">{title}</h5>
          <Button
            href={linkHref}
            variant="plain-primary"
            className="inline-block"
            startIcon={<OpenInNewIcon />}
          >
            {/* TODO: Translation */}
            Zobraziť viac
          </Button>
        </div>
      </CardContent>
    </CardBox>
  )
}

export default PartnerCard
