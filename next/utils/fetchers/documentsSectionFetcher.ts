import { Key } from 'swr'

import { Sort } from '../../components/molecules/SortSelect'
import { DocumentMeili } from '../../types/meiliTypes'
import { isDefined } from '../isDefined'
import { meiliClient } from '../meilisearch'

export type DocumentsSectionFilters = {
  pageSize: number
  search: string
  categoryId: string | null
  page: number
  sort: Sort
  filetype: string | null
}

export const documentsSectionDefaultFilters: DocumentsSectionFilters = {
  pageSize: 24,
  search: '',
  page: 1,
  categoryId: null,
  sort: 'newest',
  filetype: null,
}

export const getDocumentsSectionSwrKey = (filters: DocumentsSectionFilters) =>
  ['DocumentsSection', filters] as Key

export const documentsSectionFetcher = (filters: DocumentsSectionFilters) => () => {
  return meiliClient.index('document').search<DocumentMeili>(filters.search, {
    limit: filters.pageSize,
    offset: (filters.page - 1) * filters.pageSize,
    filter: [
      isDefined(filters.categoryId) ? `documentCategory.id = ${filters.categoryId}` : null,
      isDefined(filters.filetype) ? `file.ext = ${filters.filetype}` : null,
    ].filter(Boolean) as string[],
    sort: [
      filters.sort === 'newest' ? 'publishedAtTimestamp:asc' : null,
      filters.sort === 'oldest' ? 'publishedAtTimestamp:desc' : null,
    ].filter(Boolean) as string[],
  })
}

export const documentsSectionPrefetch = {
  sectionTypename: 'ComponentSectionsDocumentsSection',
  key: getDocumentsSectionSwrKey(documentsSectionDefaultFilters),
  fetcher: documentsSectionFetcher(documentsSectionDefaultFilters),
} as const
