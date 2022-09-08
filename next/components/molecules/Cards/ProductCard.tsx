import cx from 'classnames'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import { useHover } from 'usehooks-ts'

import ShoppingCartIcon from '../../../assets/shopping_cart.svg'
import Button from '../../atoms/Button'
import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'
import FormatCurrency from '../../atoms/FormatCurrency'
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
  const buttonHoverRef = useRef<HTMLButtonElement>(null)
  const isButtonHovered = useHover(buttonHoverRef)

  const handleCardClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(linkHref)
  }

  return (
    <CardBox {...rest} hover={!isButtonHovered} onClick={handleCardClick}>
      {image && (
        <div className="aspect-w-1 aspect-h-1 w-full bg-gray">
          <MImage image={image} layout="fill" objectFit="contain" />
        </div>
      )}
      <CardContent className="gap-y-2">
        <MLink href={linkHref} noStyles>
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
            {/* TODO: Translation */}
            Pridať do košíka
          </Button>
        )}
      </CardContent>
    </CardBox>
  )
}

export default ProductCard
