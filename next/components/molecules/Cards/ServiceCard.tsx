import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { UploadFile } from '../../../graphql'
import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'
import MImage from '../../atoms/MImage'
import MLink from '../../atoms/MLink'

type ServiceCardProps = {
  image: UploadFile
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
      <div className="aspect-w-1 aspect-h-1 w-full bg-gray">
        <MImage image={image} layout="fill" objectFit="cover" />
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
