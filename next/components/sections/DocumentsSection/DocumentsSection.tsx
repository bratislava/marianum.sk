import { SearchResponse } from 'meilisearch'
import { useTranslation } from 'next-i18next'
import { useEffect, useRef, useState } from 'react'
import useSwr from 'swr'
import { useDebounce } from 'usehooks-ts'

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
import DocumentsSectionCategorySelect from '@/components/sections/DocumentsSection/DocumentsSectionCategorySelect'
import DocumentsSectionFiletypeSelect from '@/components/sections/DocumentsSection/DocumentsSectionFiletypeSelect'
import {
  documentsSectionDefaultFilters,
  documentsSectionFetcher,
  DocumentsSectionFilters,
  getDocumentsSectionSwrKey,
} from '@/services/fetchers/documentsSectionFetcher'
import { DocumentMeili } from '@/services/meili/meiliTypes'
import { useDownloadAriaLabel } from '@/utils/useDownloadAriaLabel'
import { useGetSwrExtras } from '@/utils/useGetSwrExtras'
import { useScrollToViewIfDataChange } from '@/utils/useScrollToViewIfDataChange'

const Documents = ({
  data,
  filters,
}: {
  data: SearchResponse<DocumentMeili>
  filters: DocumentsSectionFilters
}) => {
  const { t } = useTranslation('common')
  const { getDownloadAriaLabel } = useDownloadAriaLabel()

  const documentsRef = useRef<HTMLDivElement>(null)
  useScrollToViewIfDataChange(data, filters, documentsRef)

  const { getFullPathMeili } = useGetFullPathMeili()

  if (data.hits.length > 0) {
    return (
      <div className="grid gap-y-3" ref={documentsRef}>
        <h2 className="sr-only">{t('DocumentsSection.aria.results')}</h2>
        {data.hits.map((document, index) => (
          // TODO: Use DocumentRow
          <Row
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            title={document.title}
            category={
              document?.documentCategory
                ? {
                    attributes: {
                      title: document.documentCategory.title,
                      slug: document.documentCategory.slug,
                    },
                  }
                : null
            }
            linkHref={getFullPathMeili('document', document) ?? ''}
            button={
              <Button
                variant="tertiary"
                startIcon={<DownloadIcon />}
                target="_blank"
                href={document.file?.url ?? ''}
                aria-label={getDownloadAriaLabel({ attributes: document.file }, document.title)}
              >
                {t('DocumentsSection.download')}
              </Button>
            }
            border={false}
          />
        ))}
      </div>
    )
  }

  return <strong>{t('DocumentsSection.noDocuments')}</strong>
}

const DataWrapper = ({
  filters,
  description,
  onPageChange,
}: {
  filters: DocumentsSectionFilters
  description?: string | null
  onPageChange: (page: number) => void
}) => {
  const { data, error } = useSwr(
    getDocumentsSectionSwrKey(filters),
    documentsSectionFetcher(filters),
  )

  const { dataToDisplay, loadingAndNoDataToDisplay, delayedLoading } = useGetSwrExtras({
    data,
    error,
  })

  // TODO replace by proper loading and error
  if (loadingAndNoDataToDisplay) {
    return <Loading />
  }

  if (error) {
    return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  }

  return (
    <>
      <LoadingOverlay loading={delayedLoading}>
        {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion */}
        <Documents data={dataToDisplay!} filters={filters} />
      </LoadingOverlay>

      {description && <p className="pt-4 md:pt-6">{description}</p>}
      {dataToDisplay ? (
        <PaginationMeili
          data={dataToDisplay}
          pageSize={filters.pageSize}
          selectedPage={filters.page}
          onPageChange={onPageChange}
        />
      ) : null}
    </>
  )
}

type DocumentsSectionProps = {
  description?: string | null
}

const DocumentsSection = ({ description }: DocumentsSectionProps) => {
  const [filters, setFilters] = useState<DocumentsSectionFilters>(documentsSectionDefaultFilters)
  const [searchInputValue, setSearchInputValue] = useState<string>('')
  const debouncedSearchInputValue = useDebounce<string>(searchInputValue, 300)

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
        <DocumentsSectionCategorySelect onCategoryChange={handleCategoryChange} />
        <DocumentsSectionFiletypeSelect onFiletypeChange={handleFiletypeChange} />
        <SortSelect onChange={handleSortChange} defaultSelected={filters.sort} />
      </FiltersBackgroundWrapper>

      <div>
        <DataWrapper filters={filters} description={description} onPageChange={handlePageChange} />
      </div>
    </Section>
  )
}

export default DocumentsSection
