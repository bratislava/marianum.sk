import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useEffect, useRef, useState } from 'react'
import {
  AriaOverlayProps,
  FocusScope,
  OverlayContainer,
  useModal,
  useOverlay,
  usePreventScroll,
} from 'react-aria'

import ArrowBack from '../../assets/arrow_back.svg'
import ArrowForward from '../../assets/arrow_forward.svg'
import Close from '../../assets/close.svg'
import { UploadImageEntityFragment } from '../../graphql'
import IconButton from '../atoms/IconButton'
import Slider from './Slider'

export type ImageLightBoxProps = {
  images: UploadImageEntityFragment[]
  initialImageIndex: number
} & AriaOverlayProps

const ImageLightBox = (props: ImageLightBoxProps) => {
  const { images, isOpen, initialImageIndex, onClose } = props

  const { t } = useTranslation('common', { keyPrefix: 'components.molecules.ImageLightBox' })

  const ref = useRef<HTMLDivElement | null>(null)

  const { overlayProps, underlayProps } = useOverlay(props, ref)

  usePreventScroll({ isDisabled: !isOpen })
  const { modalProps } = useModal()

  const [isBrowser, setBrowser] = useState(false)

  useEffect(() => {
    setBrowser(true)
  }, [])

  return isBrowser ? (
    <OverlayContainer>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div {...underlayProps} className="fixed inset-0 z-50 flex bg-black/40">
              <div
                className="pointer-events-none flex w-full items-center"
                {...overlayProps}
                {...modalProps}
                ref={ref}
              >
                <FocusScope contain restoreFocus autoFocus>
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
                        <IconButton
                          variant="white"
                          className="pointer-events-auto fixed top-6 right-6"
                          onPress={onClose}
                        >
                          <Close />
                        </IconButton>
                        {images.length > 1 && (
                          <>
                            <IconButton
                              variant="white"
                              className="pointer-events-auto"
                              onPress={goToPrevious}
                            >
                              <ArrowBack />
                            </IconButton>
                            <IconButton
                              variant="white"
                              className="pointer-events-auto"
                              onPress={goToNext}
                            >
                              <ArrowForward />
                            </IconButton>
                          </>
                        )}
                      </div>
                    )}
                  />
                </FocusScope>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </OverlayContainer>
  ) : null
}

export default ImageLightBox
