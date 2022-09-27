// single source of truth for screen breakpoints
const screenBreakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

// adding 'px' to every value for tailwind
const tailwindScreenBreakpoints = Object.fromEntries(
  Object.entries(screenBreakpoints).map(([k, v]) => [k, `${v}px`]),
)

module.exports = {
  screenBreakpoints,
  tailwindScreenBreakpoints,
}
