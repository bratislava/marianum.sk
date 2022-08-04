import { AnimatePresence, motion, PanInfo, Variant } from 'framer-motion'
import { wrap } from 'popmotion'
import { ReactNode, useCallback, useEffect, useState } from 'react'

type SliderProps = {
  children: ReactNode[]
  autoSwipeDuration?: number
}

const variants: { [name: string]: Variant } = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
}

const swipeConfidenceThreshold = 10_000

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

const Slider = ({ children, autoSwipeDuration = 0 }: SliderProps) => {
  const [[page, direction], setPage] = useState([0, 0])
  const [isDragging, setDragging] = useState(false)
  const index = wrap(0, children.length, page)

  const paginate = useCallback((newDirection: number) => {
    setPage(([currentPage]) => [currentPage + newDirection, newDirection])
  }, [])

  const dragEndHandler = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
      const swipe = swipePower(offset.x, velocity.x)

      if (swipe < -swipeConfidenceThreshold) {
        paginate(1)
      } else if (swipe > swipeConfidenceThreshold) {
        paginate(-1)
      }
      setDragging(false)
    },
    [paginate],
  )
  const dragStartHandler = useCallback(() => {
    setDragging(true)
  }, [])

  useEffect(() => {
    if (!autoSwipeDuration || isDragging) return () => {}

    const timer = setInterval(() => {
      paginate(1)
    }, autoSwipeDuration)

    return () => clearInterval(timer)
  }, [autoSwipeDuration, paginate, isDragging])

  return (
    <div className="relative z-0 flex h-full w-full items-center justify-center overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          className="absolute h-full w-full"
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragStart={dragStartHandler}
          onDragEnd={dragEndHandler}
        >
          {children[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Slider
