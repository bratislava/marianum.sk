import cx from 'classnames'
import Image from 'next/image'
import React from 'react'
import { useHover } from 'use-hooks'

import ShoppingCartIcon from '../../../assets/shopping_cart.svg'
import Button from '../../atoms/Button'
import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'
import FormatCurrency from '../../atoms/FormatCurrency'
import MLink from '../../atoms/MLink'

type ProductCardProps = {
  imageUrl: string
  imageAlt: string
  href: string
  price: number // TODO: or string?
  showAddToCartButton?: boolean
} & { showAddToCartButton: true; onAddToCartPress: () => void } & CardBoxProps

const ProductCard = ({
  imageUrl,
  imageAlt,
  href,
  price,
  showAddToCartButton,
  onAddToCartPress,
  ...rest
}: ProductCardProps) => {
  const [buttonHoverRef, isButtonHovered] = useHover<HTMLButtonElement>()

  return (
    <CardBox {...rest} hover={!isButtonHovered}>
      <div className="aspect-w-1 aspect-h-1 w-full bg-gray">
        <Image src={imageUrl} alt={imageAlt} layout="fill" objectFit="contain" />
      </div>
      <CardContent className="gap-y-2">
        <MLink
          href={href}
          noStyles
          className={cx('text-h5 font-bold line-clamp-3', {
            'group-hover:underline': !isButtonHovered,
          })}
        >
          Headline
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
            Pridať do košíka
          </Button>
        )}
      </CardContent>
    </CardBox>
  )
}

export default ProductCard
