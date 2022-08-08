import Image from 'next/image'

import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'
import MLink from '../../atoms/MLink'
import Button from '../../atoms/Button'
import ShoppingCartIcon from '../../../assets/shopping_cart.svg'
import { MouseEventHandler } from 'react'
import { useHover } from 'use-hooks'
import cx from 'classnames'

type ProductCardProps = {
  imageUrl: string
  showButton: boolean
  price: number
  onButtonClick?: () => void
} & CardBoxProps

const ProductCard = ({
  imageUrl,
  showButton,
  price,
  onButtonClick = () => {},
  ...props
}: ProductCardProps) => {
  const [buttonHoverRef, isButtonHovered] = useHover<HTMLButtonElement>()

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    console.log(event)
  }
  return (
    <CardBox {...props}>
      {imageUrl && <Image src={imageUrl} layout="fill" />}
      <CardContent className="gap-y-2">
        <MLink
          href=""
          noStyles
          className={cx('text-h5 font-bold text-heading', {
            'group-hover:underline': !isButtonHovered,
          })}
        >
          Headline
        </MLink>
        <span className="text-sm">{price} €</span>
        {showButton && (
          <Button
            className="mt-2"
            startIcon={<ShoppingCartIcon />}
            onClick={handleButtonClick}
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
