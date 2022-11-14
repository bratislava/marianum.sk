import { useGetFullPathMeili } from '@components/molecules/Navigation/NavigationProvider/useGetFullPath'
import { SearchIndexWrapped } from '@services/meili/fetchers'
import { meiliClient } from '@services/meili/meiliClient'
import { ArticleMeili, CemeteryMeili, DocumentMeili } from '@services/meili/meiliTypes'
import { getMeilisearchPageOptions, useGetSwrExtras } from '@utils'
import { SearchResponse } from 'meilisearch'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import useSWR from 'swr'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { useDebounce } from 'usehooks-ts'

export const allSearchTypes = [
  'page' as const,
  'article' as const,
  'bundle' as const,
  'document' as const,
  'branch' as const,
  'cemetery' as const,
]

type Results =
  | SearchIndexWrapped<'page', { slug: string }> // TODO: Specify type if needed.
  | SearchIndexWrapped<'article', ArticleMeili>
  | SearchIndexWrapped<'branch', { slug: string }> // TODO: Specify type if needed.
  | SearchIndexWrapped<'bundle', { slug: string }> // TODO: Specify type if needed.
  | SearchIndexWrapped<'cemetery', CemeteryMeili>
  | SearchIndexWrapped<'document', DocumentMeili>

// https://stackoverflow.com/a/52331580
export type Unpacked<T> = T extends (infer U)[] ? U : T

export type SearchType = Unpacked<typeof allSearchTypes>

export interface SearchFilters {
  pageSize: number
  page: number
  /**
   * If none are selected, all the types are displayed.
   */
  selectedTypes: SearchType[]
}

export type SearchData = SearchResponse<SearchResult>

export type UseSearchOptions = {
  filters: SearchFilters
  isSyncedWithUrlQuery?: boolean
}

export type SearchResult = {
  type: SearchType
  title: string
  link: string
}

export const useSearch = ({ filters, isSyncedWithUrlQuery = false }: UseSearchOptions) => {
  const { i18n } = useTranslation()
  const { getFullPathMeili } = useGetFullPathMeili()

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [routerSearchQuery, setRouterSearchQuery] = useQueryParam(
    'query',
    withDefault(StringParam, ''),
    {
      removeDefaultsFromUrl: true,
    },
  )

  const debouncedSearchQuery = useDebounce(
    isSyncedWithUrlQuery ? routerSearchQuery : searchQuery,
    300,
  )

  const emptySearchQuery = !debouncedSearchQuery || debouncedSearchQuery.trim() === ''

  const { data, error } = useSWR(['Search', filters, debouncedSearchQuery], () => {
    if (emptySearchQuery) {
      return Promise.resolve(null)
    }

    // If no type is selected, no filters are generated, so all of them are displayed.
    const selectedTypesFilter = filters.selectedTypes.map((type) => `type = ${type}`).join(' OR ')

    return meiliClient
      .index('search_index')
      .search<Results>(debouncedSearchQuery, {
        ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        filter: [`locale = ${i18n.language ?? 'sk'} OR locale NOT EXISTS`, selectedTypesFilter],
      })
      .then((response) => {
        const newHits = response.hits.map((hit) => {
          const { type } = hit
          // TODO: Fix types, but not worth it.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const dataInner = (hit as any)[type]
          const link = getFullPathMeili(type, dataInner)
          return { type, title: dataInner.title, link, data: dataInner } as SearchResult
        })

        return { ...response, hits: newHits }
      })
  })

  const swrExtras = useGetSwrExtras({
    data,
    error,
  })

  return {
    searchQuery: isSyncedWithUrlQuery ? routerSearchQuery : searchQuery,
    setSearchQuery: isSyncedWithUrlQuery ? setRouterSearchQuery : setSearchQuery,
    emptySearchQuery,
    data,
    error,
    ...swrExtras,
  }
}
