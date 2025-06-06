import Image from 'next/image'
import { ComponentProps } from 'react'

import { UploadFile } from '@/graphql'

export type MImageImage = Pick<UploadFile, 'url' | 'alternativeText' | 'width' | 'height'>

type MImageProps = Omit<ComponentProps<typeof Image>, 'src' | 'alt' | 'width' | 'height'> & {
  image: MImageImage
}

const MImage = ({ image, ...rest }: MImageProps) => (
  <Image
    src={image.url}
    alt={image.alternativeText ?? ''}
    // TODO: Placeholder doesn't respect objectFit when used with layout="fill".
    // Next shows Image with src "..." and "layout='fill'" has unused properties assigned. Please remove "width" and "height".
    width={rest.fill ? undefined : (image.width ?? undefined)}
    height={rest.fill ? undefined : (image.height ?? undefined)}
    {...rest}
  />
)

export default MImage
