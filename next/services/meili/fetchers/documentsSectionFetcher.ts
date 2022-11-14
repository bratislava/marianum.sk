import { Sort } from '@components/molecules/SortSelect'
import { meiliClient } from '@services/meili/meiliClient'
import { getMeilisearchPageOptions, isDefined } from '@utils'
import { Key } from 'swr'

import { DocumentMeili } from '../meiliTypes'
import { SearchIndexWrapped, unwrapFromSearchIndex } from './searchIndexWrapped'

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
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'document', DocumentMeili>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: [
        'type = "document"',
        isDefined(filters.categoryId)
          ? `document.documentCategory.id = ${filters.categoryId}`
          : null,
        isDefined(filters.filetype) ? `document.file.ext = ${filters.filetype}` : null,
      ].filter(Boolean) as string[],
      sort: [
        filters.sort === 'newest' ? 'document.publishedAtTimestamp:asc' : null,
        filters.sort === 'oldest' ? 'document.publishedAtTimestamp:desc' : null,
      ].filter(Boolean) as string[],
    })
    .then(unwrapFromSearchIndex('document'))
}

export const documentsSectionPrefetch = {
  sectionTypename: 'ComponentSectionsDocumentsSection',
  key: getDocumentsSectionSwrKey(documentsSectionDefaultFilters),
  fetcher: documentsSectionFetcher(documentsSectionDefaultFilters),
} as const
