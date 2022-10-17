import { useCallback, useEffect, useMemo, useState } from 'react'

import { screenBreakpoints } from '../screen-breakpoints.config'

// this hook returns current tailwind breakpoint ("sm" | "md" | "lg" | "xl")
// or null when screen is smaller then "sm" breakpoint
export const useTailwindBreakpoint = () => {
  const [screenWidth, setScreenWidth] = useState(0)
  const [breakpoint, setBreakpoint] = useState<keyof typeof screenBreakpoints | null>(null)

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

  const onWindowResize = useCallback(() => {
    setScreenWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    onWindowResize()
    window.addEventListener('resize', onWindowResize)
    return () => {
      window.removeEventListener('resize', onWindowResize)
    }
  }, [onWindowResize])

  useEffect(() => {
    let currentBreakpoint: keyof typeof screenBreakpoints | null = null
    let biggestBreakpointValue = 0

    // find the biggest breakpoint
    ;(Object.keys(screenBreakpoints) as (keyof typeof screenBreakpoints)[]).forEach((bp) => {
      const breakpointValue = screenBreakpoints[bp]
      if (breakpointValue > biggestBreakpointValue && screenWidth >= breakpointValue) {
        biggestBreakpointValue = breakpointValue
        currentBreakpoint = bp
      }
    })

    setBreakpoint(currentBreakpoint)
  }, [screenWidth])

  return { breakpoint, isNull, isSM, isMD, isLG, isXL }
}
