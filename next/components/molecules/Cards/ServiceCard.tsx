import CardBox, { CardBoxProps } from '@components/atoms/Card/CardBox'
import CardContent from '@components/atoms/Card/CardContent'
import ImagePlaceholder from '@components/atoms/ImagePlaceholder'
import MImage, { MImageImage } from '@components/atoms/MImage'
import MLink from '@components/atoms/MLink'
import { useTranslation } from 'next-i18next'
import React, { useId } from 'react'

type ServiceCardProps = {
  image?: MImageImage | null
  title: string
  linkHref: string
} & CardBoxProps

const ServiceCard = ({ image, title, linkHref, ...rest }: ServiceCardProps) => {
  const { t } = useTranslation()
  const titleId = useId()

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't trigger the `handleCardClick` function when link clicked.
    event.stopPropagation()
  }

  return (
    <CardBox {...rest}>
      <div className="aspect-w-1 aspect-h-1 w-full bg-gray">
        {image ? <MImage image={image} fill className="object-contain" /> : <ImagePlaceholder />}
      </div>
      <CardContent className="justify-between">
        <div>
          <h3 id={titleId} className="text-h5 line-clamp-3 group-hover:underline">
            {title}
          </h3>
        </div>
        <div className="mt-4">
          <MLink
            href={linkHref}
            aria-labelledby={titleId}
            noArrow
            className="inline-block after:absolute after:inset-0"
            onClick={handleLinkClick}
          >
            {t('Cards.showMore')}
          </MLink>
        </div>
      </CardContent>
    </CardBox>
  )
}

export default ServiceCard
