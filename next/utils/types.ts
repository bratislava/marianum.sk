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

export type MenuItemType<T extends MenuItemType<T>> = {
  id: number
  title: string
  path?: string | null
  items?: (T | null | undefined)[] | null
} | null

export type MeilisearchResultType<T> = {
  id?: number
  slug?: string
  title: string
  index: T
}
