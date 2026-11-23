import { createContext, PropsWithChildren, useContext } from 'react'

import { GeneralEntityFragment } from '@/graphql'

type GeneralContextValue = {
  general: GeneralEntityFragment['attributes'] | null
}

const GeneralContext = createContext<GeneralContextValue>({ general: null })

export const GeneralContextProvider = ({
  general,
  children,
}: PropsWithChildren<{ general: GeneralEntityFragment | null | undefined }>) => {
  return (
    <GeneralContext.Provider value={{ general: general?.attributes ?? null }}>
      {children}
    </GeneralContext.Provider>
  )
}

export const useGeneralContext = () => useContext(GeneralContext)
