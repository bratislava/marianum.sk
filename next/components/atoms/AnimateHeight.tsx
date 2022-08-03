import { motion, useReducedMotion, Variant } from 'framer-motion'
import React, { ReactNode, useMemo } from 'react'
import { useResizeDetector } from 'react-resize-detector'

type AnimateHeightProps = {
  isVisible: boolean
  ease?: string
  duration?: number
  children?: ReactNode
  openedVariant?: Variant
  closedVariant?: Variant
}

export const AnimateHeight = ({
  duration,
  ease = 'easeInOut',
  openedVariant = { opacity: 1, visibility: 'visible' },
  closedVariant = { opacity: 0, visibility: 'hidden' },
  isVisible,
  children,
}: AnimateHeightProps) => {
  const { height, ref } = useResizeDetector()

  const calculatedDuration = useMemo(() => {
    const constant = (height ?? 0) / 36
    return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10)
  }, [height])

  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="overflow-hidden"
      aria-hidden={!isVisible}
      initial="open"
      animate={isVisible ? { ...openedVariant, height } : { ...closedVariant, height: 0 }}
      inherit={false}
      transition={{
        ease,
        duration: shouldReduceMotion ? 0 : duration ?? calculatedDuration / 1000,
      }}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  )
}
