import { RefObject, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import { useEventListener } from 'usehooks-ts'

import cn from '@/utils/cn'

export const useHorizontalScrollFade = ({
  ref,
  classNameLeft = 'scroll-fade-left',
  classNameLeftOpaque = 'scroll-fade-left-opaque',
  classNameRight = 'scroll-fade-right',
  classNameRightOpaque = 'scroll-fade-right-opaque',
}: {
  ref: RefObject<HTMLElement | null>
  classNameLeft?: string
  classNameLeftOpaque?: string
  classNameRight?: string
  classNameRightOpaque?: string
}) => {
  const [isScrolledLeft, setIsScrolledLeft] = useState(true)
  const [isScrolledRight, setIsScrolledRight] = useState(true)

  const handleScrollOrResize = () => {
    if (!ref.current) {
      return
    }
    const scrollableWidth = ref.current.scrollWidth
    const viewportWidth = ref.current.clientWidth

    setIsScrolledLeft(ref.current.scrollLeft === 0)
    setIsScrolledRight(
      ref.current.scrollLeft >= scrollableWidth - viewportWidth - 2 /* Can be off few pixels */,
    )
  }

  // Also triggers the function on the mount, so no need for useEffect.
  useResizeDetector({ targetRef: ref, onResize: () => handleScrollOrResize() })
  // TODO Remove temporary type fix when usehooks-ts accept React 19 refs: https://github.com/juliencrn/usehooks-ts/pull/680
  useEventListener('scroll', handleScrollOrResize, { current: ref.current! })

  return {
    scrollFadeClassNames: cn(classNameLeft, classNameRight, {
      [classNameRightOpaque]: !isScrolledRight,
      [classNameLeftOpaque]: !isScrolledLeft,
    }),
  }
}
