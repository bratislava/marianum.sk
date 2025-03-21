import cx from 'classnames'
import { FocusTrap } from 'focus-trap-react'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useRef } from 'react'
import {
  AriaOverlayProps,
  OverlayContainer,
  useModal,
  useOverlay,
  usePreventScroll,
} from 'react-aria'
import { twMerge } from 'tailwind-merge'
import { useIsClient } from 'usehooks-ts'

import { CloseIcon } from '@/assets/icons'
import IconButton from '@/components/atoms/IconButton'

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
                <FocusTrap>
                  <div
                    className={twMerge('mx-auto flex w-fit items-center', overlayClassName)}
                    {...overlayProps}
                    {...modalProps}
                    ref={ref}
                  >
                    {showCloseButton && (
                      <IconButton
                        variant="white"
                        className="fixed right-6 top-6 z-30"
                        onPress={onClose}
                      >
                        <CloseIcon />
                      </IconButton>
                    )}
                    {children}
                  </div>
                </FocusTrap>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </OverlayContainer>
  ) : null
}

export default Modal
