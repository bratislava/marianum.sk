import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import { useOverlayTriggerState } from 'react-stately'

import { UploadImageEntityFragment } from '../../graphql'
import ImageLightBox from '../molecules/ImageLightBox'
import Section from '../molecules/Section'

export type ImageGallerySectionProps = {
  title?: string | null
  images?: UploadImageEntityFragment[] | null
}

const ImageGallerySection = ({ title, images }: ImageGallerySectionProps) => {
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

  // number of columns (when column layout is set)
  const columnsCount = useMemo(() => {
    return (containerWidth ?? 0) > 1000 ? 8 : (containerWidth ?? 0) > 800 ? 6 : 4
  }, [containerWidth])

  // number of not displayed images
  const moreImagesCount = useMemo(() => {
    return imageCount - columnsCount > 0 ? imageCount - columnsCount : 0
  }, [imageCount, columnsCount])

  // images in row
  const rowImages = useMemo(() => {
    return filteredImages.slice(1, columnsCount)
  }, [filteredImages, columnsCount])

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
    <Section fullWidth>
      <div ref={containerRef} className="flex flex-col gap-4">
        {title && <div className="text-h2">{title}</div>}

        {/* first image */}
        <button
          type="button"
          onClick={() => openAtImageIndex(0)}
          className={cx('relative w-full outline-offset-2 outline-primary focus:outline-4', {
            'h-[500px]': columnsCount > 6,
            'pt-[53%]': columnsCount <= 6,
          })}
        >
          <img
            className="absolute top-0 h-full w-full object-cover"
            src={firstImage.attributes?.url}
            alt={firstImage.attributes?.alternativeText ?? ''}
          />
        </button>

        {/* row images */}
        {rowImages.length > 0 && (
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${columnsCount}, 1fr)` }}
          >
            {rowImages.map((image, index) => (
              <button
                type="button"
                onClick={() => openAtImageIndex(index + 1)}
                key={image.id}
                className="relative w-full pt-[100%] outline-offset-2 outline-primary focus:outline-4"
              >
                <img
                  className="absolute top-0 h-full w-full object-cover"
                  src={image.attributes?.url}
                  alt={image.attributes?.alternativeText ?? ''}
                />
              </button>
            ))}

            {/* more images button */}
            {moreImagesCount > 0 && (
              <button
                type="button"
                onClick={() => openAtImageIndex(0)}
                className="relative w-full border border-border pt-[100%] outline-offset-2 outline-primary focus:outline-4"
              >
                <div className="absolute top-0 flex h-full w-full items-center justify-center bg-white">
                  {t('morePhotos', { count: moreImagesCount })}
                </div>
              </button>
            )}
          </div>
        )}
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
