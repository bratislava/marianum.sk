import { useEffect, useRef, useState } from 'react'
import { AriaOverlayProps, FocusScope, useModal, useOverlay, usePreventScroll } from 'react-aria'

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

  const ref = useRef<HTMLDivElement | null>(null)

  const { overlayProps, underlayProps } = useOverlay(props, ref)

  usePreventScroll()
  const { modalProps } = useModal()

  const [isBrowser, setBrowser] = useState(false)

  useEffect(() => {
    setBrowser(true)
  }, [])

  return isBrowser && isOpen ? (
    <div className="fixed inset-0 z-50 flex bg-black/40" {...underlayProps}>
      <FocusScope contain restoreFocus autoFocus>
        <div
          className="pointer-events-none flex w-full items-center"
          {...overlayProps}
          {...modalProps}
          ref={ref}
        >
          <Slider
            allowKeboardNavigation={images.length > 1}
            initialPage={initialImageIndex}
            pages={images.map(({ id, attributes }) => (
              <div
                key={id}
                className="container pointer-events-none mx-auto flex h-full w-full items-center justify-center"
              >
                <img
                  draggable="false"
                  className="pointer-events-auto h-auto max-h-[90vh] w-full max-w-5xl select-none object-contain"
                  src={attributes?.url}
                  alt={attributes?.alternativeText ?? ''}
                />
              </div>
            ))}
            pagination={({ goToPrevious, goToNext }) => (
              <div className="container pointer-events-none absolute z-20 mx-auto flex w-full max-w-6xl justify-between">
                {images.length > 1 && (
                  <>
                    <IconButton
                      variant="white"
                      className="pointer-events-auto"
                      aria-label="Go to previous photo"
                      onPress={goToPrevious}
                    >
                      <ArrowBack />
                    </IconButton>
                    <IconButton
                      variant="white"
                      className="pointer-events-auto"
                      aria-label="Go to next photo"
                      onPress={goToNext}
                    >
                      <ArrowForward />
                    </IconButton>
                  </>
                )}
                <IconButton
                  variant="white"
                  className="pointer-events-auto fixed top-6 right-6"
                  aria-label="Go to next photo"
                  onPress={onClose}
                >
                  <Close />
                </IconButton>
              </div>
            )}
          />
        </div>
      </FocusScope>
    </div>
  ) : null
}

export default ImageLightBox
