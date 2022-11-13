import { OpenInNewIcon } from '@assets/icons'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import Button from '../../atoms/Button'
import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'
import MImage, { MImageImage } from '../../atoms/MImage'
import MLink from '../../atoms/MLink'

type PartnerCardProps = {
  title: string
  linkHref: string
  image?: MImageImage | null
} & CardBoxProps

const PartnerCard = ({ title, linkHref, image, ...rest }: PartnerCardProps) => {
  const router = useRouter()
  const { t } = useTranslation()

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
      <CardContent className="justify-between gap-y-4">
        {image && (
          <div className="aspect-w-[240] aspect-h-[72] w-full bg-gray md:aspect-w-[216] md:aspect-h-[83]">
            <MImage image={image} layout="fill" objectFit="contain" />
          </div>
        )}
        <div className="flex flex-col items-center gap-y-2">
          <h5 className="line-clamp-3 group-hover:underline">
            <MLink href={linkHref} noStyles onClick={handleLinkClick}>
              {title}
            </MLink>
          </h5>
          <Button
            href={linkHref}
            tabIndex={-1}
            variant="plain-primary"
            className="inline-block"
            startIcon={<OpenInNewIcon />}
          >
            {t('Cards.showMore')}
          </Button>
        </div>
      </CardContent>
    </CardBox>
  )
}

export default PartnerCard
