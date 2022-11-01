import { SearchResponse } from 'meilisearch'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useDebounce } from 'usehooks-ts'

import { useGetFullPathMeili } from '../components/molecules/Navigation/NavigationProvider/useGetFullPath'
import { ArticleMeili, BranchMeili, DocumentMeili } from '../types/meiliTypes'
import { SearchIndexWrapped } from '../utils/fetchers/searchIndexWrapped'
import { getMeilisearchPageOptions } from '../utils/getMeilisearchPageOptions'
import { meiliClient } from '../utils/meilisearch'
import { Unpacked } from '../utils/types'
import useGetSwrExtras from '../utils/useGetSwrExtras'

export const allSearchTypes = [
  'branch' as const,
  'document' as const,
  'page' as const,
  'bundle' as const,
  'article' as const,
]

type Results =
  | SearchIndexWrapped<'branch', BranchMeili>
  | SearchIndexWrapped<'document', DocumentMeili>
  | SearchIndexWrapped<'page', { slug: string }> // TODO: Specify type if needed.
  | SearchIndexWrapped<'bundle', { slug: string }> // TODO: Specify type if needed.
  | SearchIndexWrapped<'article', ArticleMeili>

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
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // on first render set searchQuery according to urlQuery
  useEffect(() => {
    if (isSyncedWithUrlQuery) {
      const urlSearchQuery = new URLSearchParams(window.location.search).get('query')
      if (urlSearchQuery) {
        setSearchQuery(urlSearchQuery)
      }
    }
  }, [isSyncedWithUrlQuery])

  // set urlQuery according to searchQuery to keep them in sync
  useEffect(() => {
    if (isSyncedWithUrlQuery) {
      const queryParams = new URLSearchParams(window.location.search)
      if (searchQuery) {
        queryParams.set('query', searchQuery)
      } else if (searchQuery !== null) {
        queryParams.delete('query')
      }

      let stringParams = queryParams.toString()
      stringParams = stringParams ? `?${stringParams}` : ''

      window.history.replaceState({}, '', `${window.location.pathname}${stringParams}`)
    }
  }, [searchQuery, isSyncedWithUrlQuery])

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
    searchQuery,
    setSearchQuery,
    emptySearchQuery,
    data,
    error,
    ...swrExtras,
  }
}
