import Image from 'next/image'
import { ComponentProps } from 'react'

import { UploadFile } from '../../graphql'

type MImageProps = Omit<
  ComponentProps<typeof Image>,
  'src' | 'alt' | 'placeholder' | 'blurDataURL' | 'width' | 'height'
> & { image: UploadFile; disableBlurPlaceholder?: boolean }

// TODO: Placeholder doesn't respect objectFit when used with layout="fill".
const MImage = ({ image, disableBlurPlaceholder = false, ...rest }: MImageProps) => (
  <Image
    src={image.url}
    // Type 'null' is not assignable to type 'string | undefined'.
    alt={image.alternativeText ?? undefined}
    placeholder={disableBlurPlaceholder ? undefined : 'blur'}
    blurDataURL={
      disableBlurPlaceholder || image.placeholder === null ? undefined : image.placeholder
    }
    // Next shows Image with src "..." and "layout='fill'" has unused properties assigned. Please remove "width" and "height".
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    width={rest.layout === 'fill' ? undefined : image.width!}
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    height={rest.layout === 'fill' ? undefined : image.height!}
    {...rest}
  />
)

export default MImage
