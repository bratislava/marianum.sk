import { useTranslation } from 'next-i18next'
import { useId } from 'react'

import { AddIcon, CheckIcon } from '@/assets/icons'
import CardBox, { CardBoxProps } from '@/components/atoms/Card/CardBox'
import CardContent from '@/components/atoms/Card/CardContent'
import FormatCurrency from '@/components/atoms/FormatCurrency'
import ImagePlaceholder from '@/components/atoms/ImagePlaceholder'
import MImage, { MImageImage } from '@/components/atoms/MImage'
import MLink from '@/components/atoms/MLink'

type BundleCardProps = {
  image?: MImageImage | null
  name: string
  priceFrom: number
  discountText?: string | null | undefined
  claims: string[]
  claimsPlus: string[]
  linkHref: string
} & CardBoxProps

const BundleCard = ({
  image,
  name,
  priceFrom,
  discountText,
  claims,
  claimsPlus,
  linkHref,
  ...props
}: BundleCardProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'Cards' })

  const titleId = useId()

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't trigger the `handleCardClick` function when link clicked.
    event.stopPropagation()
  }

  return (
    <CardBox {...props}>
      <CardContent largePadding className="grow gap-6">
        <div className="relative size-[56px] bg-gray">
          {image ? <MImage image={image} fill className="object-cover" /> : <ImagePlaceholder />}
        </div>

        <div>
          <h4 id={titleId} className="line-clamp-3 text-h5 group-hover:underline">
            {name}
          </h4>
          <div className="flex flex-wrap items-center gap-3">
            <div className="whitespace-nowrap font-semibold">
              {t('from')} <FormatCurrency value={priceFrom} />
            </div>
            {discountText && (
              <div className="rounded-2xl bg-primary/12 px-3 py-1.5 text-sm font-semibold leading-4 text-primary">
                {discountText}
              </div>
            )}
          </div>
        </div>

        <div className="grow">
          {claims.length > 0 && (
            <ul>
              {claims.map((claim, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index} className="flex gap-3 text-sm not-first:mt-1">
                  <span className="mt-0.5 text-primary-light">
                    <CheckIcon />
                  </span>
                  {claim}
                </li>
              ))}
            </ul>
          )}
          {claimsPlus.length > 0 && (
            <ul className="mt-2">
              {claimsPlus.map((claim, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index} className="mt-1 flex gap-3 text-sm font-semibold">
                  <span className="mt-0.5 text-primary-light">
                    <AddIcon />
                  </span>
                  {claim}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <MLink
            href={linkHref}
            aria-labelledby={titleId}
            noArrow
            className="after:absolute after:inset-0"
            onClick={handleLinkClick}
          >
            {t('showMore')}
          </MLink>
        </div>
      </CardContent>
    </CardBox>
  )
}

export default BundleCard
