import { ShoppingCartIcon } from '@assets/icons'
import Button from '@components/atoms/Button'
import CardBox, { CardBoxProps } from '@components/atoms/Card/CardBox'
import CardContent from '@components/atoms/Card/CardContent'
import FormatCurrency from '@components/atoms/FormatCurrency'
import ImagePlaceholder from '@components/atoms/ImagePlaceholder'
import MImage, { MImageImage } from '@components/atoms/MImage'
import MLink from '@components/atoms/MLink'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { useRef } from 'react'
import { useHover } from 'usehooks-ts'

type ProductCardProps = {
  image?: MImageImage | null
  title: string
  linkHref: string
  price: number
  showAddToCartButton?: boolean
  onAddToCartPress?: () => void
} & CardBoxProps

const ProductCard = ({
  image,
  title,
  linkHref,
  price,
  showAddToCartButton,
  onAddToCartPress = () => {},
  ...rest
}: ProductCardProps) => {
  const { t } = useTranslation()

  const buttonHoverRef = useRef<HTMLButtonElement>(null)
  const isButtonHovered = useHover(buttonHoverRef)

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't trigger the `handleCardClick` function when link clicked.
    event.stopPropagation()
  }

  return (
    <CardBox {...rest} hover={!isButtonHovered}>
      <div className="aspect-w-1 aspect-h-1 w-full bg-gray">
        {image ? <MImage image={image} fill className="object-contain" /> : <ImagePlaceholder />}
      </div>
      <CardContent className="gap-y-2">
        <MLink
          href={linkHref}
          noStyles
          onClick={handleLinkClick}
          className="after:absolute after:inset-0"
        >
          <h3
            className={cx('text-h5 line-clamp-3', {
              'group-hover:underline': !isButtonHovered,
            })}
          >
            {title}
          </h3>
        </MLink>
        <span className="text-sm">
          <FormatCurrency value={price} />
        </span>
        {showAddToCartButton && (
          <Button
            className="z-[1] mt-2"
            startIcon={<ShoppingCartIcon />}
            onPress={() => onAddToCartPress()}
            ref={buttonHoverRef}
          >
            {t('ProductCard.addToCart')}
          </Button>
        )}
      </CardContent>
    </CardBox>
  )
}

export default ProductCard
