/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */

import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import { useOverlayTriggerState } from 'react-stately'

import { UploadImageEntityFragment } from '../../graphql'
import { onEnterOrSpaceKeyDown } from '../../utils/onEnterOrSpaceKeyDown'
import ImageLightBox from '../molecules/ImageLightBox'

export type ImageGalleryProps = {
  images: UploadImageEntityFragment[] | undefined
  variant?: 'bellow' | 'aside'
}

const ImageGallery = ({ images = [], variant = 'bellow' }: ImageGalleryProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'sections.ImageGallerySection' })

  // all images count
  const imageCount = useMemo(() => {
    return images.length
  }, [images])

  const firstImage = useMemo(() => {
    return (images[0] ?? undefined) as UploadImageEntityFragment | undefined
  }, [images])

  const { ref: containerRef, width: containerWidth } = useResizeDetector()

  // number of columns (when 'below' layout is set) || 3 (when 'aside' layout is set)
  const thumbnailCount = useMemo(() => {
    if (variant === 'aside') {
      // variant 'aside' large
      return (containerWidth ?? 0) > 700
        ? 3
        : // variant 'aside'small
          0
    }
    // variant 'bellow' large
    return (containerWidth ?? 0) > 1000
      ? 7
      : // variant 'bellow' middle
      (containerWidth ?? 0) > 800
      ? 5
      : // variant 'bellow' small
        3
  }, [containerWidth, variant])

  // number of not displayed images
  const moreImagesCount = useMemo(() => {
    return Math.max(imageCount - thumbnailCount, 0)
  }, [imageCount, thumbnailCount])

  const smallImages = useMemo(() => {
    return images.slice(1, thumbnailCount + 1)
  }, [images, thumbnailCount])

  const overlayState = useOverlayTriggerState({ defaultOpen: false })
  const [initialImageIndex, setInitialImageIndex] = useState(0)

  const openAtImageIndex = useCallback(
    (index: number) => {
      setInitialImageIndex(index)
      overlayState.open()
    },
    [overlayState],
  )

  return (
    <>
      <div className="relative flex w-full flex-col gap-4">
        <div
          ref={containerRef}
          role="button"
          tabIndex={0}
          aria-label={t('aria.openImageGallery')}
          onKeyUp={onEnterOrSpaceKeyDown(() => openAtImageIndex(0))}
          className={cx('cursor-default outline-offset-2 outline-primary focus:outline-4', {
            'flex flex-col ': variant === 'bellow',
            'grid grid-cols-[1fr_auto]': variant === 'aside',
          })}
        >
          {/* first image */}
          {firstImage && (
            <div
              onClick={() => openAtImageIndex(0)}
              className={cx('relative w-full cursor-pointer', {
                // large 'bellow' layout
                'h-[500px]': thumbnailCount > 6 && variant === 'bellow',
                // small & middle 'bellow' layout
                'pt-[53%]': thumbnailCount <= 6 && variant === 'bellow',
                // large 'aside' layout
                'h-[360px]': thumbnailCount !== 0 && variant === 'aside',
                // small 'aside' layout
                'pt-[54%]': thumbnailCount === 0 && variant === 'aside',
              })}
            >
              <img
                className="absolute top-0 h-full w-full object-cover"
                src={firstImage.attributes?.url}
                alt={firstImage.attributes?.alternativeText ?? ''}
              />
            </div>
          )}

          {/* row images */}
          {variant === 'bellow' && smallImages.length > 0 && (
            <div
              className="mt-4 grid gap-4"
              style={{ gridTemplateColumns: `repeat(${thumbnailCount + 1}, 1fr)` }}
            >
              {smallImages.map((image, index) => (
                <div
                  onClick={() => openAtImageIndex(index + 1)}
                  key={image.id}
                  className="relative w-full cursor-pointer pt-[100%]"
                >
                  <img
                    className="absolute top-0 h-full w-full object-cover"
                    src={image.attributes?.url}
                    alt={image.attributes?.alternativeText ?? ''}
                  />
                </div>
              ))}

              {/* more images button */}
              {moreImagesCount > 0 && (
                <div
                  onClick={() => openAtImageIndex(0)}
                  className="relative w-full cursor-pointer border border-border pt-[100%]"
                >
                  <div className="absolute top-0 flex h-full w-full items-center justify-center bg-white p-2 text-center font-semibold text-primary">
                    {t('morePhotos', { count: moreImagesCount })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* aside images */}
          {variant === 'aside' && smallImages.length > 0 && (
            <div
              className={cx('ml-6 hidden grid-flow-col grid-rows-2 gap-6', {
                'grid-cols-2 md:grid': imageCount > 3,
                'md:grid': imageCount > 1 && imageCount <= 3,
                hidden: imageCount === 1,
              })}
            >
              {smallImages.map((image, index) => (
                <div
                  onClick={() => openAtImageIndex(index + 1)}
                  key={image.id}
                  className="relative w-[168px] cursor-pointer pt-[168px]"
                >
                  <img
                    className="absolute top-0 h-full w-full object-cover"
                    src={image.attributes?.url}
                    alt={image.attributes?.alternativeText ?? ''}
                  />
                </div>
              ))}

              {/* more images button */}
              {moreImagesCount > 0 && (
                <div
                  onClick={() => openAtImageIndex(0)}
                  className="relative w-[168px] cursor-pointer pt-[166px]"
                >
                  <div className="absolute top-0 flex h-full w-full items-center justify-center bg-white p-8 text-center font-semibold text-primary">
                    {t('showAllPhotos')}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <ImageLightBox
        onClose={() => overlayState.close()}
        isOpen={overlayState.isOpen}
        images={images}
        initialImageIndex={initialImageIndex}
        isDismissable
      />
    </>
  )
}

export default ImageGallery
