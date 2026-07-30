import { Sort } from '@/components/molecules/SortSelect'
import { meiliClient } from '@/services/meili/meiliClient'
import { AssetMeili } from '@/services/meili/meiliTypes'
import { SearchIndexWrapped, unwrapFromSearchIndex } from '@/services/meili/searchIndexWrapped'
import { getMeilisearchPageOptions } from '@/utils/getMeilisearchPageOptions'
import { isDefined } from '@/utils/isDefined'

export type AssetsFilters = {
  pageSize: number
  search: string
  categoryId: string | null
  page: number
  sort: Sort
  filetype: string | null
}

export const assetsDefaultFilters: AssetsFilters = {
  pageSize: 24,
  search: '',
  page: 1,
  categoryId: null,
  sort: 'newest',
  filetype: null,
}

export const getMeiliAssetsQueryKey = (filters: AssetsFilters) => ['Assets', filters]

export const meiliAssetsFetcher = async (filters: AssetsFilters) => {
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'asset', AssetMeili>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: [
        'type = "asset"',
        isDefined(filters.categoryId)
          ? `asset.assetCategory.id = ${filters.categoryId}`
          : null,
        isDefined(filters.filetype) ? `asset.file.ext = ${filters.filetype}` : null,
      ].filter(Boolean) as string[],
      sort: [
        filters.sort === 'newest' ? 'asset.updatedAtTimestamp:desc' : null,
        filters.sort === 'oldest' ? 'asset.updatedAtTimestamp:asc' : null,
      ].filter(Boolean) as string[],
    })
    .then(unwrapFromSearchIndex('asset'))
}

export const getMeiliAssetsQuery = (filters: AssetsFilters = assetsDefaultFilters) => {
  return {
    queryKey: getMeiliAssetsQueryKey(filters),
    queryFn: async () => meiliAssetsFetcher(filters),
  } as const
}
