import { Enum_Disclosure_Type } from '@graphql'
import { meiliClient } from '@services/meili/meiliClient'
import { getMeilisearchPageOptions } from '@utils/getMeilisearchPageOptions'
import { Key } from 'swr'

import { DisclosureMeili } from '../meili/meiliTypes'

export type DisclosuresSectionFilters = {
  pageSize: number
  search: string
  page: number
  type: Enum_Disclosure_Type | null
}

export const disclosuresSectionDefaultFilters: DisclosuresSectionFilters = {
  pageSize: 20,
  search: '',
  page: 1,
  type: null,
}

export const getDisclosuresSectionSwrKey = (filters: DisclosuresSectionFilters) =>
  ['DisclosuresSection', filters] as Key

export const disclosuresSectionFetcher = (filters: DisclosuresSectionFilters) => () =>
  meiliClient.index('disclosure').search<DisclosureMeili>(filters.search, {
    ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
    // Buggy ESLint rule
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    filter: filters.type ? [`type = ${filters.type}`] : [],
  })

export const disclosuresSectionPrefetch = {
  sectionTypename: 'ComponentSectionsDisclosuresSection',
  key: getDisclosuresSectionSwrKey(disclosuresSectionDefaultFilters),
  fetcher: disclosuresSectionFetcher(disclosuresSectionDefaultFilters),
} as const
