import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'

/*
 * Some should have negative margin and overlay the hero section. This utility holds the state whether the hero should
 * be overlaid. The state is activated from the respective section
 */

const Context = createContext<{ currentValue: boolean; changeValue: (v: boolean) => void }>({
  currentValue: false,
  changeValue: () => {},
})

// eslint-disable-next-line @typescript-eslint/ban-types
export const HeroSectionOverlayProvider = ({ children }: PropsWithChildren<{}>) => {
  const [currentValue, setCurrentValue] = useState(false)

  const changeValue = (value: boolean) => {
    setCurrentValue(value)
  }

  return <Context.Provider value={{ currentValue, changeValue }}>{children}</Context.Provider>
}

/**
 * Activates the overlay from respective section.
 * @param value
 */
export const useActivateHeroSectionContentOverlay = (value: boolean) => {
  const context = useContext(Context)

  useEffect(() => {
    context.changeValue(value)

    return () => {
      context.changeValue(false)
    }
  }, [context, value])
}

/**
 * Returns whether the hero section is overlaid.
 */
export const useIsHeroSectionOverlaid = () => {
  const context = useContext(Context)
  return context.currentValue
}
