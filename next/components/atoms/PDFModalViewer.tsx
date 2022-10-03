import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
  AriaOverlayProps,
  FocusScope,
  OverlayContainer,
  useModal,
  useOverlay,
  usePreventScroll,
} from 'react-aria'

import Close from '../../assets/close.svg'
import IconButton from './IconButton'
import PDFViewer from './PDFViewer'

type PDFModalViewerProps = {
  url: string
} & AriaOverlayProps

const PDFModalViewer = (props: PDFModalViewerProps) => {
  const { isOpen, onClose, url } = props
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
                  <IconButton
                    variant="white"
                    className="pointer-events-auto fixed top-6 right-6 z-30"
                    onPress={onClose}
                  >
                    <Close />
                  </IconButton>
                  <div className="pointer-events-auto h-full w-full">
                    <PDFViewer className="py-16 px-8" url={url} />
                  </div>
                </FocusScope>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </OverlayContainer>
  ) : null
}

export default PDFModalViewer
