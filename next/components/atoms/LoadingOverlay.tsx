import { AnimatePresence, motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

import Loading from '@/components/atoms/Loading'
import cn from '@/utils/cn'

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
    <div className={cn('relative', { 'min-h-[88]': loading })}>
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
      <div className={cn({ 'opacity-20 duration-200': loading })}>{children}</div>
    </div>
  )
}

export default LoadingOverlay
