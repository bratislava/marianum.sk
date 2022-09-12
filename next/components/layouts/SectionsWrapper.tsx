import { createContext, HTMLProps, ReactNode, useCallback, useMemo } from 'react'

export type BackgroundColor = 'dark' | 'light'

type SectionContextValue = {
  getBackground: (index: number) => BackgroundColor
  getDivider: (index: number) => boolean
  getLast: (index: number) => boolean
  isContainer: boolean
}

export const sectionContext = createContext<SectionContextValue>({
  getBackground: () => 'light',
  getDivider: () => false,
  getLast: () => false,
  isContainer: false,
})

export type SectionsWrapperProps = {
  children: ReactNode
  alternateBackground?: boolean
  startBackground?: BackgroundColor
  background?: BackgroundColor
  isContainer?: boolean
} & HTMLProps<HTMLDivElement>

const SectionsWrapper = ({
  children,
  alternateBackground = false,
  startBackground = 'light',
  background = 'light',
  isContainer = false,
  ...rest
}: SectionsWrapperProps) => {
  const sectionCount = useMemo(() => (Array.isArray(children) ? children.length : 1), [children])

  const oddBackground: BackgroundColor = useMemo(() => startBackground, [startBackground])

  const evenBackground: BackgroundColor = useMemo(
    () => (startBackground === 'light' ? 'dark' : 'light'),
    [startBackground],
  )

  const getBackground = useCallback(
    (index: number): BackgroundColor => {
      const oddOrEven = !!((index + 1) % 2)
      if (alternateBackground) {
        // last section is always dark when alternating
        if (sectionCount === index + 1) {
          return 'dark'
        }
        // otherwise alternate
        return oddOrEven ? oddBackground : evenBackground
      }
      return background
    },
    [oddBackground, evenBackground, alternateBackground, background, sectionCount],
  )

  const getDivider = useCallback(
    (index: number) => {
      // is alternating && is last && previous is dark => then divider is displayed
      return (
        alternateBackground && sectionCount === index + 1 && getBackground(index - 1) === 'dark'
      )
    },
    [sectionCount, alternateBackground, getBackground],
  )

  const getLast = useCallback(
    (index: number) => {
      return sectionCount === index + 1
    },
    [sectionCount],
  )

  const contextValue: SectionContextValue = useMemo(
    () => ({
      getBackground,
      getDivider,
      getLast,
      isContainer,
    }),
    [getBackground, getDivider, getLast, isContainer],
  )

  return (
    <sectionContext.Provider value={contextValue}>
      <div {...rest}>{children}</div>
    </sectionContext.Provider>
  )
}

export default SectionsWrapper
