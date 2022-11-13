import { isDefined } from '@utils'
import { createContext, HTMLProps, ReactNode, useCallback, useMemo } from 'react'

export type BackgroundColor = 'dark' | 'light'

type SectionContextValue = {
  background: BackgroundColor
  isDivider: boolean
  isFirst: boolean
  isLast: boolean
  // TODO: Consider removing, as it's always `true` in our use cases.
  alternateBackground: boolean
}

export const sectionContext = createContext<SectionContextValue>({
  background: 'dark',
  isDivider: false,
  isFirst: false,
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
  const filteredChildren = useMemo(
    () => (Array.isArray(children) ? children.filter(isDefined) : [children]),
    [children],
  )
  const sectionCount = useMemo(() => filteredChildren.length, [filteredChildren])

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
        alternateBackground &&
        sectionCount === index + 1 &&
        getBackground(index - 1) === 'dark' &&
        index !== 0
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
      {filteredChildren.map((child, index) => (
        <sectionContext.Provider
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          value={{
            alternateBackground,
            background: getBackground(index),
            isDivider: getDivider(index),
            isFirst: index === 0,
            isLast: getLast(index),
          }}
        >
          {child}
        </sectionContext.Provider>
      ))}
    </div>
  )
}

export default SectionsWrapper
