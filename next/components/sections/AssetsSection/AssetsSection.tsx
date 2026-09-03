import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { SearchResponse } from 'meilisearch'
import { useTranslation } from 'next-i18next/pages'
import { useEffect, useRef, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import { DownloadIcon } from '@/assets/icons'
import Button from '@/components/atoms/Button'
import Loading from '@/components/atoms/Loading'
import LoadingOverlay from '@/components/atoms/LoadingOverlay'
import FilteringSearchInput from '@/components/molecules/FilteringSearchInput'
import FiltersBackgroundWrapper from '@/components/molecules/FiltersBackgroundWrapper'
import { useGetFullPathMeili } from '@/components/molecules/Navigation/NavigationProvider/useGetFullPath'
import PaginationMeili from '@/components/molecules/PaginationMeili'
import Row from '@/components/molecules/Row/Row'
import Section from '@/components/molecules/Section'
import SortSelect, { Sort } from '@/components/molecules/SortSelect'
import AssetsSectionCategorySelect from '@/components/sections/AssetsSection/AssetsSectionCategorySelect'
import AssetsSectionFiletypeSelect from '@/components/sections/AssetsSection/AssetsSectionFiletypeSelect'
import {
  assetsDefaultFilters,
  AssetsFilters,
  getMeiliAssetsQueryKey,
  meiliAssetsFetcher,
} from '@/services/fetchers/assetsFetcher'
import { AssetMeili } from '@/services/meili/meiliTypes'
import { useDownloadAriaLabel } from '@/utils/useDownloadAriaLabel'
import { useScrollToViewIfDataChange } from '@/utils/useScrollToViewIfDataChange'

const Assets = ({
  data,
  filters,
}: {
  data: SearchResponse<AssetMeili>
  filters: AssetsFilters
}) => {
  const { t } = useTranslation()
  const { getDownloadAriaLabel } = useDownloadAriaLabel()

  const assetsRef = useRef<HTMLDivElement>(null)
  useScrollToViewIfDataChange(data, filters, assetsRef)

  const { getFullPathMeili } = useGetFullPathMeili()

  if (data.hits.length > 0) {
    return (
      <div className="grid gap-y-3" ref={assetsRef}>
        <h2 className="sr-only">{t('AssetsSection.aria.results')}</h2>
        {data.hits.map((asset, index) => (
          // TODO: Use AssetRow
          <Row
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            title={asset.title ?? undefined}
            applyFocusStyles={false}
            category={
              asset?.assetCategory
                ? {
                    attributes: {
                      title: asset.assetCategory.title,
                      slug: asset.assetCategory.slug,
                    },
                  }
                : null
            }
            linkHref={getFullPathMeili('asset', asset) ?? ''}
            button={
              <Button
                variant="tertiary"
                startIcon={<DownloadIcon />}
                target="_blank"
                href={asset.file?.url ?? ''}
                aria-label={getDownloadAriaLabel({ attributes: asset.file }, asset.title)}
              >
                {t('AssetsSection.download')}
              </Button>
            }
            border={false}
          />
        ))}
      </div>
    )
  }

  return <strong>{t('AssetsSection.noAssets')}</strong>
}

const DataWrapper = ({
  filters,
  description,
  onPageChange,
}: {
  filters: AssetsFilters
  description?: string | null
  onPageChange: (page: number) => void
}) => {
  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: getMeiliAssetsQueryKey(filters),
    queryFn: async () => meiliAssetsFetcher(filters),
    placeholderData: keepPreviousData,
  })

  if (isPending) {
    return <Loading />
  }

  // TODO replace by proper error
  if (isError) {
    return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  }

  return (
    <>
      <LoadingOverlay loading={isFetching}>
        <Assets data={data} filters={filters} />
      </LoadingOverlay>

      {description && <p className="pt-4 md:pt-6">{description}</p>}
      {data.hits.length > 0 ? (
        <PaginationMeili
          data={data}
          pageSize={filters.pageSize}
          selectedPage={filters.page}
          onPageChange={onPageChange}
        />
      ) : null}
    </>
  )
}

type AssetsSectionProps = {
  description?: string | null
}

const AssetsSection = ({ description }: AssetsSectionProps) => {
  const [filters, setFilters] = useState<AssetsFilters>(assetsDefaultFilters)
  const [searchInputValue, setSearchInputValue] = useState<string>('')
  const [debouncedSearchInputValue] = useDebounceValue<string>(searchInputValue, 300)

  useEffect(() => {
    if (filters.search !== debouncedSearchInputValue) {
      setFilters({ ...filters, search: debouncedSearchInputValue, page: 1 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchInputValue])

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  const handleCategoryChange = (categoryId: string | null) => {
    setFilters({ ...filters, page: 1, categoryId })
  }

  const handleFiletypeChange = (filetype: string | null) => {
    setFilters({ ...filters, page: 1, filetype })
  }

  const handleSortChange = (sort: Sort) => {
    setFilters({ ...filters, sort })
  }

  return (
    <Section overlayWithHero>
      <FiltersBackgroundWrapper className="mb-4 grid grid-cols-1 gap-4 md:mb-6 md:grid-cols-3">
        <div className="md:col-span-3">
          <FilteringSearchInput
            value={searchInputValue}
            onChange={(value) => setSearchInputValue(value)}
          />
        </div>

        <AssetsSectionCategorySelect onCategoryChange={handleCategoryChange} />

        <AssetsSectionFiletypeSelect onFiletypeChange={handleFiletypeChange} />

        <SortSelect onChange={handleSortChange} defaultSort={filters.sort} />
      </FiltersBackgroundWrapper>

      <div>
        <DataWrapper filters={filters} description={description} onPageChange={handlePageChange} />
      </div>
    </Section>
  )
}

export default AssetsSection
