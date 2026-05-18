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
  const { t } = useTranslation()

  const titleId = useId()

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't trigger the `handleCardClick` function when link clicked.
    event.stopPropagation()
  }

  return (
    <CardBox {...props}>
      <CardContent largePadding className="grow gap-6">
        <div className="bg-gray relative size-[56px]">
          {image ? <MImage image={image} fill className="object-cover" /> : <ImagePlaceholder />}
        </div>

        <div>
          <h4 id={titleId} className="text-size-h5-r lg:text-size-h5 line-clamp-3 group-hover:underline">
            {name}
          </h4>
          <div className="flex flex-wrap items-center gap-3">
            <div className="whitespace-nowrap font-semibold">
              <FormatCurrency value={priceFrom} />
            </div>
            {discountText && (
              <div className="bg-primary/12 text-size-p-small text-primary rounded-2xl px-3 py-1.5 font-semibold leading-4">
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
                <li key={index} className="text-size-p-small not-first:mt-1 flex gap-3">
                  <span className="text-primary-light mt-0.5">
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
                <li key={index} className="text-size-p-small mt-1 flex gap-3 font-semibold">
                  <span className="text-primary-light mt-0.5">
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
            {t('Cards.showMore')}
          </MLink>
        </div>
      </CardContent>
    </CardBox>
  )
}

export default BundleCard
