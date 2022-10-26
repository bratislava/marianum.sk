import { ReactNode } from 'react'

// Start the name with "T" to identify custom types

export type THomepageSliderSlide = {
  key: string
  title: string
  description: string
  buttonText: string
  imageSrc: string
}

export type TBreadcrumbListItem = {
  label: ReactNode
  link?: string | null | undefined
}

// https://stackoverflow.com/a/52331580
export type Unpacked<T> = T extends (infer U)[] ? U : T
