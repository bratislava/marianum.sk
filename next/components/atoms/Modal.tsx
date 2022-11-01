import cx from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useRef } from 'react'
import {
  AriaOverlayProps,
  FocusScope,
  OverlayContainer,
  useModal,
  useOverlay,
  usePreventScroll,
} from 'react-aria'
import { twMerge } from 'tailwind-merge'
import { useIsClient } from 'usehooks-ts'

import CloseIcon from '../../assets/close.svg'
import IconButton from './IconButton'

export type ModalProps = {
  children: ReactNode
  showCloseButton?: boolean
  underlayClassName?: string
  overlayClassName?: string
  centerVertically?: boolean
} & AriaOverlayProps

const Modal = (props: ModalProps) => {
  const {
    isOpen,
    onClose,
    children,
    isDismissable,
    underlayClassName,
    overlayClassName,
    showCloseButton = true,
    centerVertically = true,
  } = props
  const ref = useRef<HTMLDivElement | null>(null)
  const { overlayProps, underlayProps } = useOverlay(
    { ...props, isDismissable: isDismissable === undefined ? true : isDismissable },
    ref,
  )
  usePreventScroll({ isDisabled: !isOpen })
  const { modalProps } = useModal()

  const isClient = useIsClient()

  return isClient ? (
    <FocusScope contain>
      <OverlayContainer>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="relative z-50"
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div
                {...underlayProps}
                className={twMerge(
                  'fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black/40',
                  underlayClassName,
                )}
              >
                <div className={cx({ 'flex min-h-full items-center': centerVertically })}>
                  <div
                    className={twMerge('mx-auto flex w-fit items-center', overlayClassName)}
                    {...overlayProps}
                    {...modalProps}
                    ref={ref}
                  >
                    {showCloseButton && (
                      <IconButton
                        variant="white"
                        className="fixed top-6 right-6 z-30"
                        onPress={onClose}
                      >
                        <CloseIcon />
                      </IconButton>
                    )}
                    {children}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </OverlayContainer>
    </FocusScope>
  ) : null
}

export default Modal
