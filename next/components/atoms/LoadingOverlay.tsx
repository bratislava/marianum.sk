import cx from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import React, { PropsWithChildren } from 'react'

import Loading from './Loading'

type LoadingOverlayProps = { loading: boolean }

/**
 * An element that acts like padding, but is shrunk when div changes its height.
 *
 * 44px - half of the height of spinner + loading text
 */
const ShrinkablePadding = () => <div className="h-20 min-h-[50%-44] shrink" />

const LoadingOverlay = ({ loading, children }: PropsWithChildren<LoadingOverlayProps>) => {
  return (
    // 88px - height of spinner + loading text
    <div className={cx('relative', { 'min-h-[88]': loading })}>
      {loading ? (
        <AnimatePresence>
          <motion.div
            className="absolute top-0 left-0 flex h-full w-full flex-col items-center bg-primary-dark/50"
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ShrinkablePadding />
            {/* For some reason it displays behind aspect-w-* elements, so z-index is added. */}
            <Loading className="z-10 shrink-0 text-white" />
            <ShrinkablePadding />
          </motion.div>
        </AnimatePresence>
      ) : null}
      {children}
    </div>
  )
}

export default LoadingOverlay
