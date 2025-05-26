import { useTranslation } from 'next-i18next'
import { useEffect, useRef } from 'react'

import { ArrowLeftIcon, ArrowRightIcon } from '@/assets/icons'
import IconButton from '@/components/atoms/IconButton'
import MImage from '@/components/atoms/MImage'
import Modal, { ModalProps } from '@/components/atoms/Modal'
import Slider from '@/components/molecules/Slider'
import { UploadImageEntityFragment } from '@/graphql'

export type ImageLightBoxProps = {
  images: UploadImageEntityFragment[]
  initialImageIndex: number
} & Omit<ModalProps, 'children'>

const ImageLightBox = (props: ImageLightBoxProps) => {
  const { images, initialImageIndex, ...rest } = props

  const { isOpen } = rest

  const { t } = useTranslation()

  const sliderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      sliderRef.current?.focus()
    }
  }, [isOpen])

  return (
    <Modal overlayClassName="w-full h-screen pointer-events-none" {...rest}>
      <Slider
        ref={sliderRef}
        description={t('ImageLightBox.aria.description')}
        allowKeyboardNavigation={images.length > 1}
        initialPage={initialImageIndex}
        pages={images
          .filter((image) => image.attributes)
          .map(({ id, attributes }) => (
            <div
              key={id}
              className="container pointer-events-none flex size-full max-w-6xl flex-col items-center justify-center md:px-[88px]"
            >
              <MImage
                draggable="false"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion,@typescript-eslint/no-unnecessary-type-assertion
                image={attributes!}
                className="pointer-events-auto h-auto max-h-[86vh] w-full select-none object-contain"
                sizes="100vw"
              />
              {attributes?.caption !== attributes?.name && (
                <div className="mt-4 rounded-2xl bg-white px-2.5 py-0.5">{attributes?.caption}</div>
              )}
            </div>
          ))}
        pagination={({ goToPrevious, goToNext }) => (
          <div className="container pointer-events-none absolute bottom-0 z-20 flex w-full max-w-6xl justify-between p-6 md:bottom-auto">
            {images.length > 1 && (
              <>
                <IconButton variant="white" className="pointer-events-auto" onPress={goToPrevious}>
                  <ArrowLeftIcon />
                </IconButton>
                <IconButton variant="white" className="pointer-events-auto" onPress={goToNext}>
                  <ArrowRightIcon />
                </IconButton>
              </>
            )}
          </div>
        )}
      />
    </Modal>
  )
}

export default ImageLightBox
