import { useMemo } from 'react'
import { useWindowSize } from 'usehooks-ts'

import { screenBreakpoints } from '@/screen-breakpoints.config'

// this hook returns current tailwind breakpoint ("sm" | "md" | "lg" | "xl")
// or null when screen is smaller than "sm" breakpoint
export const useTailwindBreakpoint = () => {
  const { width } = useWindowSize()

  const breakpoint = useMemo<keyof typeof screenBreakpoints | null>(() => {
    let currentBreakpoint: keyof typeof screenBreakpoints | null = null
    let biggestBreakpointValue = 0

    // find the biggest breakpoint
    ;(Object.keys(screenBreakpoints) as (keyof typeof screenBreakpoints)[]).forEach((bp) => {
      const breakpointValue = screenBreakpoints[bp]
      if (breakpointValue > biggestBreakpointValue && width >= breakpointValue) {
        biggestBreakpointValue = breakpointValue
        currentBreakpoint = bp
      }
    })

    return currentBreakpoint
  }, [width])

  const isNull = useMemo(() => {
    return breakpoint === null
  }, [breakpoint])

  const isSM = useMemo(() => {
    return breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg' || breakpoint === 'xl'
  }, [breakpoint])

  const isMD = useMemo(() => {
    return breakpoint === 'md' || breakpoint === 'lg' || breakpoint === 'xl'
  }, [breakpoint])

  const isLG = useMemo(() => {
    return breakpoint === 'lg' || breakpoint === 'xl'
  }, [breakpoint])

  const isXL = useMemo(() => {
    return breakpoint === 'xl'
  }, [breakpoint])

  return { breakpoint, isNull, isSM, isMD, isLG, isXL }
}
