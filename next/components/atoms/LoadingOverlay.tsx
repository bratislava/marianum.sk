import cx from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

import Loading from '@/components/atoms/Loading'

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
            className="absolute left-0 top-0 flex size-full flex-col items-center"
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ShrinkablePadding />
            {/* For some reason it displays behind aspect-w-* elements, so z-index is added. */}
            <Loading className="z-10 shrink-0 text-primary-dark" />
            <ShrinkablePadding />
          </motion.div>
        </AnimatePresence>
      ) : null}
      <div className={cx({ 'opacity-15': loading })}>{children}</div>
    </div>
  )
}

export default LoadingOverlay
