import { AnimatePresence, motion, PanInfo, Variant } from 'framer-motion'
import { wrap } from 'popmotion'
import { FC, KeyboardEvent, ReactNode, useCallback, useEffect, useState } from 'react'

type SliderProps = {
  pages: ReactNode[]
  autoSwipeDuration?: number
  pagination?: FC<{
    count: number
    activeIndex: number
    goToPage: (index: number) => void
    goToPrevious: () => void
    goToNext: () => void
  }>
  initialPage?: number
  allowKeboardNavigation?: boolean
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

const Slider = ({
  pages,
  autoSwipeDuration = 0,
  pagination: Pagination,
  initialPage,
  allowKeboardNavigation = false,
}: SliderProps) => {
  const [[page, direction], setPage] = useState([initialPage ?? 0, 0])
  const [isDragging, setDragging] = useState(false)
  const index = wrap(0, pages.length, page)

  const paginate = useCallback((newDirection: number) => {
    setPage(([currentPage]) => [currentPage + newDirection, newDirection])
  }, [])

  const goToNext = useCallback(() => {
    paginate(1)
  }, [paginate])

  const goToPrevious = useCallback(() => {
    paginate(-1)
  }, [paginate])

  const dragEndHandler = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
      const swipe = swipePower(offset.x, velocity.x)

      if (swipe < -swipeConfidenceThreshold) {
        goToNext()
      } else if (swipe > swipeConfidenceThreshold) {
        goToPrevious()
      }
      setDragging(false)
    },
    [goToNext, goToPrevious],
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

  const goToPage = useCallback(
    (goToIndex: number) => {
      const newDirection = index < goToIndex ? 1 : -1
      setPage([goToIndex, newDirection])
    },
    [index],
  )

  const keyUpHandler = useCallback(
    ({ code }: KeyboardEvent) => {
      if (!allowKeboardNavigation) return
      if (code === 'ArrowLeft') {
        goToPrevious()
        return
      }

      if (code === 'ArrowRight') {
        goToNext()
      }
    },
    [goToNext, goToPrevious, allowKeboardNavigation],
  )

  return (
    <div
      tabIndex={0}
      role="button"
      onKeyUp={keyUpHandler}
      className="relative z-0 flex h-full w-full items-center justify-center overflow-hidden"
    >
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
          {pages[index]}
        </motion.div>
      </AnimatePresence>
      {Pagination && (
        <Pagination
          count={pages.length}
          activeIndex={index}
          goToPage={goToPage}
          goToNext={goToNext}
          goToPrevious={goToPrevious}
        />
      )}
    </div>
  )
}

export default Slider
