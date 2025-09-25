import { Sort } from '@/components/molecules/SortSelect'
import { client } from '@/services/graphql/gqlClient'
import { meiliClient } from '@/services/meili/meiliClient'
import { CemeteryMeili } from '@/services/meili/meiliTypes'
import { SearchIndexWrapped, unwrapFromSearchIndex } from '@/services/meili/searchIndexWrapped'
import { getMeilisearchPageOptions } from '@/utils/getMeilisearchPageOptions'
import { isDefined } from '@/utils/isDefined'

export const getGraphqlCemeteriesQueryKey = (locale: string) => ['Cemeteries', locale]

export const graphqlCemeteriesFetcher = (locale: string) => client.Cemeteries({ locale })

export const getGraphqlCemeteriesQuery = (locale: string) => {
  return {
    queryKey: getGraphqlCemeteriesQueryKey(locale),
    queryFn: () => graphqlCemeteriesFetcher(locale),
  } as const
}

export type CemeteriesFilters = {
  pageSize: number
  search: string
  categoryId: string | null
  page: number
  sort: Sort
  filetype: string | null
}

export const cemeteriesDefaultFilters: CemeteriesFilters = {
  pageSize: 24,
  search: '',
  page: 1,
  categoryId: null,
  sort: 'newest',
  filetype: null,
}

export const getMeiliCemeteriesQueryKey = (filters: CemeteriesFilters) => ['Cemeteries', filters]

export const meiliCemeteriesFetcher = (filters: CemeteriesFilters) => {
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'cemetery', CemeteryMeili>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: [
        'type = "cemetery"',
        isDefined(filters.categoryId)
          ? `cemetery.cemeteryCategory.id = ${filters.categoryId}`
          : null,
      ].filter(Boolean) as string[],
      sort: ['cemetery.title:asc'],
    })
    .then(unwrapFromSearchIndex('cemetery'))
}

export const getMeiliCemeteriesQuery = (filters: CemeteriesFilters = cemeteriesDefaultFilters) => {
  return {
    queryKey: getMeiliCemeteriesQueryKey(filters),
    queryFn: () => meiliCemeteriesFetcher(filters),
  } as const
}
