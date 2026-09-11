import { useTranslation } from 'next-i18next/pages'
import { useEffect, useRef } from 'react'

import { ArrowLeftIcon, ArrowRightIcon } from '@/assets/icons'
import IconButton from '@/components/atoms/IconButton'
import MImage from '@/components/atoms/MImage'
import Modal, { ModalProps } from '@/components/atoms/Modal'
import Slider from '@/components/molecules/Slider'
import { UploadImageEntityFragment } from '@/graphql'
import { isDefined } from '@/utils/isDefined'

export type ImageLightBoxProps = {
  images: (UploadImageEntityFragment | null)[]
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
        pages={images.filter(isDefined).map((image) => (
          <div
            key={image.documentId}
            className="pointer-events-none container flex size-full max-w-6xl flex-col items-center justify-center md:px-[88px]"
          >
            <MImage
              draggable="false"
              image={image}
              className="pointer-events-auto h-auto max-h-[86vh] w-full object-contain select-none"
              sizes="100vw"
            />
            {image.caption !== image.name && (
              <div className="mt-4 rounded-2xl bg-white px-2.5 py-0.5">{image.caption}</div>
            )}
          </div>
        ))}
        pagination={({ goToPrevious, goToNext }) => (
          <div className="pointer-events-none absolute bottom-0 z-20 container flex w-full max-w-6xl justify-between p-6 md:bottom-auto">
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
