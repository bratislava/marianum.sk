import CardBox, { CardBoxProps } from '@components/atoms/Card/CardBox'
import CardContent from '@components/atoms/Card/CardContent'
import ImagePlaceholder from '@components/atoms/ImagePlaceholder'
import MImage, { MImageImage } from '@components/atoms/MImage'
import MLink from '@components/atoms/MLink'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'

type ServiceCardProps = {
  image?: MImageImage | null
  title: string
  linkHref: string
} & CardBoxProps

const ServiceCard = ({ image, title, linkHref, ...rest }: ServiceCardProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't trigger the `handleCardClick` function when link clicked.
    event.stopPropagation()
  }

  const handleCardClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(linkHref)
  }

  return (
    <CardBox {...rest} onClick={handleCardClick}>
      <div className="aspect-w-1 aspect-h-1 w-full bg-gray">
        <MLink href={linkHref} tabIndex={-1} noStyles onClick={handleLinkClick} aria-label={title}>
          {image ? <MImage image={image} layout="fill" objectFit="cover" /> : <ImagePlaceholder />}
        </MLink>
      </div>
      <CardContent className="justify-between">
        <div>
          <h5 className="line-clamp-3 group-hover:underline">
            <MLink href={linkHref} noStyles onClick={handleLinkClick}>
              {title}
            </MLink>
          </h5>
        </div>
        <div className="mt-4">
          <MLink
            href={linkHref}
            tabIndex={-1}
            noArrow
            className="inline-block"
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
