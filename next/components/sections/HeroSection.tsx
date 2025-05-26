import cx from 'classnames'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

import { HomeIcon } from '@/assets/icons'
import Breadcrumbs, { BreadcrumbItem } from '@/components/atoms/Breadcrumbs'
import Button from '@/components/atoms/Button'
import FormatCurrency from '@/components/atoms/FormatCurrency'
import NormalizeText from '@/components/atoms/NormalizeText/NormalizeText'
import { useGetLinkProps } from '@/components/molecules/Navigation/NavigationProvider/useGetLinkProps'
import { useNavigationContext } from '@/components/molecules/Navigation/NavigationProvider/useNavigationContext'
import { CtaButtonFragment } from '@/graphql'
import { getBreadcrumbs } from '@/utils/getBreadcrumbs'
import { useIsHeroSectionOverlaid } from '@/utils/heroSectionContentOverlay'

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
  const router = useRouter()
  const { getLinkProps } = useGetLinkProps()

  const { navMap } = useNavigationContext()

  const linkProps = getLinkProps(ctaButton)

  const breadcrumbs = [
    { label: <HomeIcon />, path: '/' },
    ...getBreadcrumbs(router.asPath, navMap),
    ...(breadcrumbsMoreItems ?? []),
  ]

  const isOverlaid = useIsHeroSectionOverlaid()

  return (
    <div className="bg-primary-dark text-white/72">
      <div className="container relative">
        <Breadcrumbs crumbs={breadcrumbs} className="sm:pt-8" />

        <div
          className={cx('py-5 empty:hidden md:w-[648px] md:pt-6', {
            'md:pb-[104px]': isOverlaid,
            'md:pb-14': !isOverlaid,
          })}
        >
          {title && <h1 className="text-white">{title}</h1>}
          {perex && (
            <p className="mt-3 text-lg">
              <NormalizeText>{perex}</NormalizeText>
            </p>
          )}
          {ctaButton && (
            <Button {...linkProps} className="mt-6">
              {linkProps?.label}
            </Button>
          )}
          {price && (
            <div className="mt-6">
              <div>{t('HeroSection.priceFrom')}</div>
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
