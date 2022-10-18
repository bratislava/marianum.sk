import { RefObject, useEffect } from 'react'
import scrollIntoView from 'smooth-scroll-into-view-if-needed'

export const useScrollToViewIfDataChange = <T extends object>(
  data: T,
  elementRef: RefObject<HTMLElement>,
) => {
  useEffect(() => {
    if (!elementRef?.current) {
      return
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    scrollIntoView(elementRef.current, {
      scrollMode: 'if-needed',
      block: 'start',
      inline: 'nearest',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
}
