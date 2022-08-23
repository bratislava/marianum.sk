/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */

import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { KeyboardEvent, useCallback, useMemo, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import { useOverlayTriggerState } from 'react-stately'

import { UploadImageEntityFragment } from '../../graphql'
import ImageLightBox from '../molecules/ImageLightBox'
import Section from '../molecules/Section'

export type ImageGallerySectionProps = {
  title?: string | null
  images?: UploadImageEntityFragment[] | null
  variant?: 'bellow' | 'aside'
}

const ImageGallerySection = ({ title, images, variant = 'bellow' }: ImageGallerySectionProps) => {
  const filteredImages = useMemo(() => {
    return images?.filter((i) => i) ?? []
  }, [images])

  const { t } = useTranslation('common', { keyPrefix: 'sections.ImageGallerySection' })

  // all images count
  const imageCount = useMemo(() => {
    return filteredImages.length
  }, [filteredImages])

  const firstImage = useMemo(() => {
    return filteredImages[0]
  }, [filteredImages])

  const { ref: containerRef, width: containerWidth } = useResizeDetector()

  // number of columns (when 'below' layout is set) || 3 (when 'aside' layout is set)
  const smallImagePlaceholderCount = useMemo(() => {
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
    return Math.max(imageCount - smallImagePlaceholderCount, 0)
  }, [imageCount, smallImagePlaceholderCount])

  const smallImages = useMemo(() => {
    return filteredImages.slice(1, smallImagePlaceholderCount + 1)
  }, [filteredImages, smallImagePlaceholderCount])

  const overlayState = useOverlayTriggerState({ defaultOpen: false })
  const [initialImageIndex, setInitialImageIndex] = useState(0)

  const openAtImageIndex = useCallback(
    (index: number) => {
      setInitialImageIndex(index)
      overlayState.open()
    },
    [overlayState],
  )

  const onContainerKeyUp = useCallback(
    ({ code }: KeyboardEvent) => {
      if (code === 'Enter' || code === 'Space') {
        openAtImageIndex(0)
      }
    },
    [openAtImageIndex],
  )

  return (
    <Section>
      <div
        tabIndex={0}
        role="button"
        onKeyUp={onContainerKeyUp}
        aria-label={t('aria.openImageGallery')}
        className="relative flex w-full flex-col gap-4 outline-offset-2 outline-primary focus:outline-4"
      >
        {title && <div className="text-h2">{title}</div>}

        <div
          ref={containerRef}
          className={cx({
            'flex flex-col ': variant === 'bellow',
            'grid grid-cols-[1fr_auto]': variant === 'aside',
          })}
        >
          {/* first image */}
          <div
            onClick={() => openAtImageIndex(0)}
            className={cx('relative w-full ', {
              // large 'bellow' layout
              'h-[500px]': smallImagePlaceholderCount > 6 && variant === 'bellow',
              // small & middle 'bellow' layout
              'pt-[53%]': smallImagePlaceholderCount <= 6 && variant === 'bellow',
              // large 'aside' layout
              'h-[360px]': smallImagePlaceholderCount !== 0 && variant === 'aside',
              // small 'aside' layout
              'pt-[54%]': smallImagePlaceholderCount === 0 && variant === 'aside',
            })}
          >
            <img
              className="absolute top-0 h-full w-full object-cover"
              src={firstImage.attributes?.url}
              alt={firstImage.attributes?.alternativeText ?? ''}
            />
          </div>

          {/* row images */}
          {variant === 'bellow' && smallImages.length > 0 && (
            <div
              className="mt-4 grid gap-4"
              style={{ gridTemplateColumns: `repeat(${smallImagePlaceholderCount + 1}, 1fr)` }}
            >
              {smallImages.map((image, index) => (
                <div
                  onClick={() => openAtImageIndex(index + 1)}
                  key={image.id}
                  className="relative w-full pt-[100%]"
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
                  className="relative w-full border border-border pt-[100%]"
                >
                  <div className="absolute top-0 flex h-full w-full items-center justify-center bg-white text-center">
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
                  className="relative w-[168px] pt-[168px]"
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
                <div onClick={() => openAtImageIndex(0)} className="relative w-[168px] pt-[166px]">
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
        images={filteredImages}
        initialImageIndex={initialImageIndex}
        isDismissable
      />
    </Section>
  )
}

export default ImageGallerySection
