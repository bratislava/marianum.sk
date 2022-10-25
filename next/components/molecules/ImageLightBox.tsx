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
} & ModalProps

const ImageLightBox = (props: ImageLightBoxProps) => {
  const { images, initialImageIndex, ...rest } = props

  const { t } = useTranslation('common', { keyPrefix: 'components.molecules.ImageLightBox' })

  return (
    <Modal overlayClassName="!w-full h-screen pointer-events-none" {...rest}>
      <Slider
        description={t('aria.description')}
        allowKeboardNavigation={images.length > 1}
        initialPage={initialImageIndex}
        pages={images.map(({ id, attributes }) => (
          <div
            key={id}
            className="container pointer-events-none flex h-full w-full max-w-6xl items-center justify-center md:px-[88px]"
          >
            <img
              draggable="false"
              className="pointer-events-auto h-auto max-h-[90vh] w-full select-none object-contain"
              src={attributes?.url}
              alt={attributes?.alternativeText ?? ''}
            />
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
