import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import PlusIcon from '../../../assets/add.svg'
import CheckIcon from '../../../assets/check.svg'
import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'
import FormatCurrency from '../../atoms/FormatCurrency'
import ImagePlaceholder from '../../atoms/ImagePlaceholder'
import MImage, { MImageImage } from '../../atoms/MImage'
import MLink from '../../atoms/MLink'

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
  const router = useRouter()
  const { t } = useTranslation()

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't trigger the `handleCardClick` function when link clicked.
    event.stopPropagation()
  }

  const handleCardClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(linkHref)
  }

  return (
    <CardBox {...props} onClick={handleCardClick}>
      <CardContent largePadding className="grow gap-6">
        <div className="relative h-[56px] w-[56px] bg-gray">
          <MLink href={linkHref} tabIndex={-1} noStyles onClick={handleLinkClick}>
            {image ? (
              <MImage image={image} layout="fill" objectFit="cover" />
            ) : (
              <ImagePlaceholder />
            )}
          </MLink>
        </div>

        <div>
          <h5 className="line-clamp-3 group-hover:underline">
            <MLink href={linkHref} noStyles onClick={handleLinkClick}>
              {name}
            </MLink>
          </h5>
          <div className="flex flex-wrap items-center gap-3">
            <div className="whitespace-nowrap font-semibold">
              {t('general.from')} <FormatCurrency value={priceFrom} />
            </div>
            {discountText && (
              <div className="whitespace-nowrap rounded-full bg-primary/12 py-1.5 px-3 text-sm font-semibold leading-4 text-primary">
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
                    <PlusIcon />
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
            tabIndex={-1}
            noArrow
            className="inline-block"
            onClick={handleLinkClick}
          >
            {t('general.showMore')}
          </MLink>
        </div>
      </CardContent>
    </CardBox>
  )
}

export default BundleCard
