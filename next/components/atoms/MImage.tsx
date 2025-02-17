import { UploadFile } from '@graphql'
import Image, { ImageLoader } from 'next/image'
import { ComponentProps } from 'react'

// After update to Next.js, loading images is broken (returns 503 and makes the server crash for a moment), this is a
// temporary fix.
export const customImageLoader: ImageLoader = ({ src, width, quality }) => {
  // https://sourcegraph.com/github.com/vercel/next.js@33d4694ba7a3847464b32d33229fd88cadadd64c/-/blob/packages/next/client/legacy/image.tsx?L168
  if (src.endsWith('.svg')) {
    return src
  }

  return `https://www.mestskakniznica.sk/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${
    quality || 75
  }`
}

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
    width={rest.fill ? undefined : (image.width ?? undefined)}
    height={rest.fill ? undefined : (image.height ?? undefined)}
    {...rest}
    // TODO remove this loader completely when confirmed that images work without it
    // loader={customImageLoader}
  />
)

export default MImage
