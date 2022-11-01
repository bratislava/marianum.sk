import { useTranslation } from 'next-i18next'

import ArrowBack from '../../assets/arrow_back.svg'
import ArrowForward from '../../assets/arrow_forward.svg'
import { UploadImageEntityFragment } from '../../graphql'
import IconButton from '../atoms/IconButton'
import Modal, { ModalProps } from '../atoms/Modal'
import Slider from './Slider'

export type ImageLightBoxProps = {
  images: UploadImageEntityFragment[]
  initialImageIndex: number
} & Omit<ModalProps, 'children'>

const ImageLightBox = (props: ImageLightBoxProps) => {
  const { images, initialImageIndex, ...rest } = props

  const { t } = useTranslation('common', { keyPrefix: 'ImageLightBox' })

  return (
    <Modal overlayClassName="w-full h-screen pointer-events-none" {...rest}>
      <Slider
        description={t('aria.description')}
        allowKeyboardNavigation={images.length > 1}
        initialPage={initialImageIndex}
        pages={images.map(({ id, attributes }) => (
          <div
            key={id}
            className="container pointer-events-none flex h-full w-full max-w-6xl flex-col items-center justify-center md:px-[88px]"
          >
            <img
              draggable="false"
              className="pointer-events-auto h-auto max-h-[86vh] w-full select-none object-contain"
              src={attributes?.url}
              alt={attributes?.alternativeText ?? ''}
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
                  <ArrowBack />
                </IconButton>
                <IconButton variant="white" className="pointer-events-auto" onPress={goToNext}>
                  <ArrowForward />
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
