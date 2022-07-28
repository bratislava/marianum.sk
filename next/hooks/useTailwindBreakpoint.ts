import { useCallback, useEffect, useState } from 'react'

// todo: take this from some single source of truth
const screens = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

// this hook returns current tailwind breakpoint ("sm" | "md" | "lg" | "xl" | "2xl")
// or null when screen is smaller then "sm" breakpoint
export const useTailwindBreakpoint = () => {
  const [screenWidth, setScreenWidth] = useState(0)
  const [breakpoint, setBreakpoint] = useState<keyof typeof screens | null>(null)

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
    let currentBreakpoint: keyof typeof screens | null = null
    let biggestBreakpointValue = 0

    // find the biggest breakpoint
    ;(Object.keys(screens) as (keyof typeof screens)[]).forEach((bp) => {
      const breakpointValue = screens[bp]
      if (breakpointValue > biggestBreakpointValue && screenWidth >= breakpointValue) {
        biggestBreakpointValue = breakpointValue
        currentBreakpoint = bp
      }
    })

    setBreakpoint(currentBreakpoint)
  }, [screenWidth])

  return breakpoint
}
