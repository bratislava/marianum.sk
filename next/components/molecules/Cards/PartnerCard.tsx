import { OpenInNewIcon } from '@assets/icons'
import Button from '@components/atoms/Button'
import CardBox, { CardBoxProps } from '@components/atoms/Card/CardBox'
import CardContent from '@components/atoms/Card/CardContent'
import MImage, { MImageImage } from '@components/atoms/MImage'
import { useTranslation } from 'next-i18next'
import { useId } from 'react'

type PartnerCardProps = {
  title: string
  linkHref: string
  image?: MImageImage | null
} & CardBoxProps

const PartnerCard = ({ title, linkHref, image, ...rest }: PartnerCardProps) => {
  const { t } = useTranslation()
  const titleId = useId()

  return (
    <CardBox {...rest}>
      <CardContent className="justify-between gap-y-4">
        {image && (
          <div className="aspect-w-[240] aspect-h-[72] w-full md:aspect-w-[216] md:aspect-h-[83]">
            <MImage image={image} fill className="object-contain" />
          </div>
        )}
        <div className="flex flex-col items-center gap-y-2">
          <h3 id={titleId} className="text-center text-h5 line-clamp-3 group-hover:underline">
            {title}
          </h3>
          <Button
            href={linkHref}
            aria-labelledby={titleId}
            variant="plain-primary"
            startIcon={<OpenInNewIcon />}
            className="after:absolute after:inset-0"
          >
            {t('Cards.showMore')}
          </Button>
        </div>
      </CardContent>
    </CardBox>
  )
}

export default PartnerCard
