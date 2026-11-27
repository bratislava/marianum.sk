import { createContext, PropsWithChildren, useContext } from 'react'

import { GeneralEntityFragment } from '@/graphql'

type GeneralContextValue = {
  general: GeneralEntityFragment | null
}

const GeneralContext = createContext<GeneralContextValue>({ general: null })

export const GeneralContextProvider = ({
  general,
  children,
}: PropsWithChildren<{ general: GeneralEntityFragment | null | undefined }>) => {
  return (
    <GeneralContext.Provider value={{ general: general ?? null }}>
      {children}
    </GeneralContext.Provider>
  )
}

export const useGeneralContext = () => useContext(GeneralContext)
