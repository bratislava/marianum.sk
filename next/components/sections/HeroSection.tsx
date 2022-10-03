import { useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

import HomeIcon from '../../assets/home.svg'
import { CtaButtonFragment } from '../../graphql'
import { TBreadcrumbListItem } from '../../utils/types'
import Breadcrumbs from '../atoms/Breadcrumbs'
import Button from '../atoms/Button'
import FormatCurrency from '../atoms/FormatCurrency'
import MLink from '../atoms/MLink'
import NormalizeSkText from '../atoms/NormalizeSkText'

type HeroSectionProps = {
  breadcrumbs?: TBreadcrumbListItem[]
  title?: string | null | undefined
  perex?: string | null | undefined
  ctaButton?: CtaButtonFragment | null | undefined
  price?: number | null | undefined
  moreContent?: ReactNode
}

const HeroSection = ({
  breadcrumbs,
  title,
  perex,
  ctaButton,
  price,
  moreContent,
}: HeroSectionProps) => {
  const { t } = useTranslation()

  const breadcrumbsWithHome = [{ label: <HomeIcon />, link: '/' }, ...(breadcrumbs ?? [])]
  const ctaSlug = ctaButton?.page?.data?.attributes?.slug

  return (
    <div className="bg-primary-dark text-white/72">
      <div className="container relative">
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
          {perex && (
            <p className="mt-3">
              <NormalizeSkText>{perex}</NormalizeSkText>
            </p>
          )}
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
      {moreContent && <div className="container relative -mb-18 w-full">{moreContent}</div>}
    </div>
  )
}

export default HeroSection
