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
    alt={image.alternativeText === null ? undefined : image.alternativeText}
    placeholder={disableBlurPlaceholder ? undefined : 'blur'}
    // Type 'null' is not assignable to type 'string | undefined'.
    blurDataURL={
      disableBlurPlaceholder || image.placeholder === null ? undefined : image.placeholder
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    width={image.width!}
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    height={image.height!}
    {...rest}
  />
)

export default MImage
