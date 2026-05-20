// Keep in sync with breakpoint definitions in globals.css
export const screenBreakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}

// adding 'px' to every value for tailwind
export const tailwindScreenBreakpoints = Object.fromEntries(
  Object.entries(screenBreakpoints).map(([k, v]) => [k, `${v}px`]),
)
