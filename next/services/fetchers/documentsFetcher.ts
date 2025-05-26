import { Sort } from '@/components/molecules/SortSelect'
import { meiliClient } from '@/services/meili/meiliClient'
import { DocumentMeili } from '@/services/meili/meiliTypes'
import { SearchIndexWrapped, unwrapFromSearchIndex } from '@/services/meili/searchIndexWrapped'
import { getMeilisearchPageOptions } from '@/utils/getMeilisearchPageOptions'
import { isDefined } from '@/utils/isDefined'

export type DocumentsFilters = {
  pageSize: number
  search: string
  categoryId: string | null
  page: number
  sort: Sort
  filetype: string | null
}

export const documentsDefaultFilters: DocumentsFilters = {
  pageSize: 24,
  search: '',
  page: 1,
  categoryId: null,
  sort: 'newest',
  filetype: null,
}

export const getMeiliDocumentsQueryKey = (filters: DocumentsFilters) => ['Documents', filters]

export const meiliDocumentsFetcher = (filters: DocumentsFilters) => {
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
        filters.sort === 'newest' ? 'document.updatedAtTimestamp:desc' : null,
        filters.sort === 'oldest' ? 'document.updatedAtTimestamp:asc' : null,
      ].filter(Boolean) as string[],
    })
    .then(unwrapFromSearchIndex('document'))
}

export const getMeiliDocumentsQuery = (filters: DocumentsFilters = documentsDefaultFilters) => {
  return {
    queryKey: getMeiliDocumentsQueryKey(filters),
    queryFn: () => meiliDocumentsFetcher(filters),
  } as const
}
