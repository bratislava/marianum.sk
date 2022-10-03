import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { ReactNode, useContext } from 'react'

import HomeIcon from '../../assets/home.svg'
import { CtaButtonFragment } from '../../graphql'
import { getBreadcrumbs } from '../../utils/getBreadcrumbs'
import { getFullPath } from '../../utils/localPaths'
import Breadcrumbs, { BreadcrumbItem } from '../atoms/Breadcrumbs'
import Button from '../atoms/Button'
import FormatCurrency from '../atoms/FormatCurrency'
import { NavigationContext } from '../layouts/NavigationProvider'

type HeroSectionProps = {
  breadcrumbsMoreItems?: BreadcrumbItem[]
  title?: string | null | undefined
  perex?: string | null | undefined
  ctaButton?: CtaButtonFragment | null | undefined
  price?: number | null | undefined
  moreContent?: ReactNode
}

const HeroSection = ({
  breadcrumbsMoreItems,
  title,
  perex,
  ctaButton,
  price,
  moreContent,
}: HeroSectionProps) => {
  const { t } = useTranslation()
  const { navMap, crumbsMap } = useContext(NavigationContext)
  const router = useRouter()

  const ctaSlug = getFullPath(ctaButton?.page?.data, navMap)

  const breadcrumbs = [
    { label: <HomeIcon />, linkHref: '/' },
    ...getBreadcrumbs(router.asPath, crumbsMap),
    ...(breadcrumbsMoreItems ?? []),
  ]

  return (
    <div className="bg-primary-dark text-white/72">
      <div className="container relative">
        <Breadcrumbs crumbs={breadcrumbs} className="sm:pt-8" />

        <div className="py-5 empty:hidden md:w-[648px] md:pb-14 md:pt-6">
          {title && <h1 className="text-white">{title}</h1>}
          {perex && <p className="mt-3">{perex}</p>}
          {ctaSlug && (
            <Button href={ctaSlug} className="mt-6">
              {ctaButton?.label}
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
