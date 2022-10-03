import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import CheckIcon from '../../../assets/check.svg'
import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'
import FormatCurrency from '../../atoms/FormatCurrency'
import MImage, { MImageImage } from '../../atoms/MImage'
import MLink from '../../atoms/MLink'

type BundleCardProps = {
  image?: MImageImage | null
  name: string
  priceFrom: number
  claims: string[]
  linkHref: string
} & CardBoxProps

const BundleCard = ({ image, name, priceFrom, claims, linkHref, ...props }: BundleCardProps) => {
  const router = useRouter()
  const { t } = useTranslation()

  const handleCardClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(linkHref)
  }

  return (
    <CardBox {...props} onClick={handleCardClick}>
      {image && (
        <div className="aspect-w-[360] aspect-h-[200] w-full bg-gray">
          <MImage image={image} layout="fill" objectFit="cover" />
        </div>
      )}
      <CardContent className="justify-between">
        <div>
          <h5 className="line-clamp-3 group-hover:underline">{name}</h5>
          <div className="mb-4 font-semibold">
            {t('general.from')} <FormatCurrency value={priceFrom} />
          </div>
          {claims.length > 0 && (
            <ul className="mb-6">
              {claims.map((claim, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index} className="mt-1 flex gap-3 text-sm">
                  <span className="mt-1.5 text-primary">
                    <CheckIcon />
                  </span>
                  {claim}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <MLink href={linkHref} noArrow className="inline-block">
            {t('general.showMore')}
          </MLink>
        </div>
      </CardContent>
    </CardBox>
  )
}

export default BundleCard
