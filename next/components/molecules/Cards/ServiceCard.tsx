import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'

import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'
import MLink from '../../atoms/MLink'

type ServiceCardProps = {
  imageUrl: string
  imageAlt: string
  title: string
  subtitle: string | null | undefined
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
  const { t } = useTranslation()
  const router = useRouter()

  const handleCardClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(linkHref)
  }

  return (
    <CardBox {...rest} onClick={handleCardClick}>
      <div className="aspect-w-1 aspect-h-1 w-full bg-gray">
        <Image src={imageUrl} alt={imageAlt} layout="fill" objectFit="cover" />
      </div>
      <CardContent className="justify-between">
        <div>
          <h5 className="line-clamp-3 group-hover:underline">{title}</h5>
          {subtitle && <div className="mt-2">{subtitle}</div>}
        </div>
        <div className="mt-4">
          <MLink href={linkHref} noArrow className="inline-block">
            {t('general.showMore')}
          </MLink>
        </div>
      </CardContent>
    </CardBox>
  )
}

export default ServiceCard
