import { UploadFile } from '@graphql'
import Image from 'next/image'
import { ComponentProps } from 'react'

export type MImageImage = Pick<
  UploadFile,
  'url' | 'alternativeText' | 'placeholder' | 'width' | 'height'
>

type MImageProps = Omit<
  ComponentProps<typeof Image>,
  'src' | 'alt' | 'placeholder' | 'blurDataURL' | 'width' | 'height'
> & {
  image: MImageImage
  disableBlurPlaceholder?: boolean
}

// TODO: Placeholder doesn't respect objectFit when used with layout="fill".
const MImage = ({ image, disableBlurPlaceholder = false, ...rest }: MImageProps) => (
  <Image
    src={image.url}
    alt={image.alternativeText ?? ''}
    placeholder={disableBlurPlaceholder || !image.placeholder ? undefined : 'blur'}
    blurDataURL={disableBlurPlaceholder || !image.placeholder ? undefined : image.placeholder}
    // Next shows Image with src "..." and "layout='fill'" has unused properties assigned. Please remove "width" and "height".
    width={rest.fill ? undefined : image.width ?? undefined}
    height={rest.fill ? undefined : image.height ?? undefined}
    {...rest}
  />
)

export default MImage
