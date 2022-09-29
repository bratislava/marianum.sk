import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'

import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'
import MImage, { MImageImage } from '../../atoms/MImage'
import MLink from '../../atoms/MLink'

type ServiceCardProps = {
  image?: MImageImage | null
  title: string
  subtitle: string | null | undefined
  linkHref: string
} & CardBoxProps

const ServiceCard = ({ image, title, subtitle, linkHref, ...rest }: ServiceCardProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  const handleCardClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(linkHref)
  }

  return (
    <CardBox {...rest} onClick={handleCardClick}>
      {image && (
        <div className="aspect-w-1 aspect-h-1 w-full bg-gray">
          <MLink href={linkHref} tabIndex={-1} noStyles>
            <MImage image={image} layout="fill" objectFit="cover" />
          </MLink>
        </div>
      )}
      <CardContent className="justify-between">
        <div>
          <h5 className="line-clamp-3 group-hover:underline">
            <MLink href={linkHref} noStyles>
              {title}
            </MLink>
          </h5>
          {subtitle && <div className="mt-2">{subtitle}</div>}
        </div>
        <div className="mt-4">
          <MLink href={linkHref} tabIndex={-1} noArrow className="inline-block">
            {t('general.showMore')}
          </MLink>
        </div>
      </CardContent>
    </CardBox>
  )
}

export default ServiceCard
