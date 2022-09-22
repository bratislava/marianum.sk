import { createContext, HTMLProps, ReactNode, useCallback, useMemo } from 'react'

export type BackgroundColor = 'dark' | 'light'

type SectionContextValue = {
  background: BackgroundColor
  isDivider: boolean
  isLast: boolean
  alternateBackground: boolean
}

export const sectionContext = createContext<SectionContextValue>({
  background: 'dark',
  isDivider: false,
  isLast: false,
  alternateBackground: false,
})

export type SectionsWrapperProps = {
  children: ReactNode
  alternateBackground?: boolean
  startBackground?: BackgroundColor
  background?: BackgroundColor
} & HTMLProps<HTMLDivElement>

const SectionsWrapper = ({
  children,
  alternateBackground = false,
  startBackground = 'light',
  background = 'dark',
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

  return (
    <div {...rest}>
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <sectionContext.Provider
            value={{
              alternateBackground,
              background: getBackground(index),
              isDivider: getDivider(index),
              isLast: getLast(index),
            }}
          >
            {child}
          </sectionContext.Provider>
        ))
      ) : (
        <sectionContext.Provider
          value={{
            alternateBackground,
            background: getBackground(0),
            isDivider: getDivider(0),
            isLast: getLast(0),
          }}
        >
          {children}
        </sectionContext.Provider>
      )}
    </div>
  )
}

export default SectionsWrapper
