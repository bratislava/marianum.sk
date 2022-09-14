import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import HomeIcon from '../../assets/home.svg'
import { CtaButtonFragment, UploadImageEntityFragment } from '../../graphql'
import { TBreadcrumbListItem } from '../../utils/types'
import Breadcrumbs from '../atoms/Breadcrumbs'
import Button from '../atoms/Button'
import FormatCurrency from '../atoms/FormatCurrency'
import MLink from '../atoms/MLink'

type HeroSectionProps = {
  title?: string | null | undefined
  perex?: string | null | undefined
  ctaButton?: CtaButtonFragment | null | undefined
  image?: UploadImageEntityFragment | null | undefined
  breadcrumbs?: TBreadcrumbListItem[]
  price?: number | null | undefined
}

const HeroSection = ({ title, perex, ctaButton, image, breadcrumbs, price }: HeroSectionProps) => {
  const { t } = useTranslation()

  const breadcrumbsWithHome = [{ label: <HomeIcon />, link: '/' }, ...(breadcrumbs ?? [])]
  const ctaSlug = ctaButton?.page?.data?.attributes?.slug

  return (
    <div className="bg-primary-dark text-white/72">
      <div className="container relative mx-auto px-4">
        <Breadcrumbs className="sm:pt-8">
          {breadcrumbsWithHome?.map(({ label, link }, index) =>
            // The home icon should always be clickable and the last item not be clickable
            breadcrumbsWithHome.length > 1 && index === breadcrumbsWithHome.length - 1 ? (
              <div key="#">{label}</div>
            ) : (
              <MLink key={link} href={link ?? '#'} noStyles className="underline">
                {label}
              </MLink>
            ),
          )}
        </Breadcrumbs>

        <div className="py-5 empty:hidden md:w-[648px] md:pb-14 md:pt-6">
          {title && <h1 className="text-white">{title}</h1>}
          {perex && <p className="mt-3">{perex}</p>}
          {ctaSlug && (
            <Button href={ctaSlug} className="mt-6">
              {ctaButton.label}
            </Button>
          )}
          {price && (
            <div className="mt-6">
              <div>{t('sections.HeroSection.priceFrom')}</div>
              <div className="mt-1 text-h4 font-bold text-white">
                <FormatCurrency value={price} />
              </div>
            </div>
          )}
        </div>
      </div>
      {image && (
        <div className="container relative mx-auto -mb-18 h-[188px] w-full sm:h-[238px] md:h-[287px] lg:h-[387px] xl:h-[440px]">
          <Image
            src={image.attributes?.url ?? ''}
            alt={image.attributes?.alternativeText ?? ''}
            layout="fill"
            objectFit="cover"
            unoptimized
          />
        </div>
      )}
    </div>
  )
}

export default HeroSection
