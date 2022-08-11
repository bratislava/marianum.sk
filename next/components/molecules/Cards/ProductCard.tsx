import cx from 'classnames'
import Image from 'next/future/image'
import { MouseEventHandler } from 'react'
import { useHover } from 'use-hooks'

import ShoppingCartIcon from '../../../assets/shopping_cart.svg'
import Button from '../../atoms/Button'
import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'
import MLink from '../../atoms/MLink'

type ProductCardProps = {
  imageUrl: string
  imageAlt: string
  showButton: boolean
  price: number // TODO: or string?
  onAddToCartPress?: () => void
} & CardBoxProps

const ProductCard = ({
  imageUrl,
  imageAlt,
  showButton,
  price,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,lodash/prefer-noop
  onAddToCartPress = () => {},
  ...rest
}: ProductCardProps) => {
  const [buttonHoverRef, isButtonHovered] = useHover<HTMLButtonElement>()

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    console.log(event)
  }

  return (
    <CardBox {...rest} hover={!isButtonHovered}>
      <div className="min-h-[100px] max-h-[200px] w-full relative">
        {imageUrl && <Image src={imageUrl} fill />}
      </div>
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
            // @ts-ignore
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
