import cx from 'classnames'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useRef } from 'react'
import { useHover } from 'usehooks-ts'

import ShoppingCartIcon from '../../../assets/shopping_cart.svg'
import Button from '../../atoms/Button'
import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'
import FormatCurrency from '../../atoms/FormatCurrency'
import ImagePlaceholder from '../../atoms/ImagePlaceholder'
import MImage, { MImageImage } from '../../atoms/MImage'
import MLink from '../../atoms/MLink'

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
  const router = useRouter()
  const { t } = useTranslation()

  const buttonHoverRef = useRef<HTMLButtonElement>(null)
  const isButtonHovered = useHover(buttonHoverRef)

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
    <CardBox {...rest} hover={!isButtonHovered} onClick={handleCardClick}>
      <div className="aspect-w-1 aspect-h-1 w-full bg-gray">
        {image ? <MImage image={image} layout="fill" objectFit="contain" /> : <ImagePlaceholder />}
      </div>
      <CardContent className="gap-y-2">
        <MLink href={linkHref} noStyles onClick={handleLinkClick}>
          <h5
            className={cx('line-clamp-3', {
              'group-hover:underline': !isButtonHovered,
            })}
          >
            {title}
          </h5>
        </MLink>
        <span className="text-sm">
          <FormatCurrency value={price} />
        </span>
        {showAddToCartButton && (
          <Button
            className="mt-2"
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
