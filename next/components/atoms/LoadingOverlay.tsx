import cx from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import React, { PropsWithChildren } from 'react'

import Spinner from './Spinner'

type LoadingOverlayProps = { loading: boolean }

/**
 * An element that acts like padding, but is shrunk when div changes its height.
 *
 * 44px - half of the height of spinner + loading text
 */
const ShrinkablePadding = () => <div className="h-20 min-h-[50%-44] shrink" />

const LoadingOverlay = ({ loading, children }: PropsWithChildren<LoadingOverlayProps>) => {
  const { t } = useTranslation()

  return (
    // 88px - height of spinner + loading text
    <div className={cx('relative', { 'min-h-[88]': loading })}>
      {loading ? (
        <AnimatePresence>
          <motion.div
            className="absolute top-0 left-0 flex h-full w-full flex-col items-center bg-primary-dark/50 text-white"
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ShrinkablePadding />
            <div className="flex shrink-0 flex-col items-center gap-4">
              <Spinner className="h-12 w-12" />
              <div className="shrink-0">{t('components.atoms.LoadingOverlay.loading')}</div>
            </div>
            <ShrinkablePadding />
          </motion.div>
        </AnimatePresence>
      ) : null}
      {children}
    </div>
  )
}

export default LoadingOverlay
