import { SearchResponse } from 'meilisearch'
import { useTranslation } from 'next-i18next'
import { useEffect, useRef, useState } from 'react'
import useSwr from 'swr'
import { useDebounce } from 'usehooks-ts'

import DownloadIcon from '../../../assets/download.svg'
import { DocumentMeili } from '../../../types/meiliTypes'
import {
  documentsSectionDefaultFilters,
  documentsSectionFetcher,
  DocumentsSectionFilters,
  getDocumentsSectionSwrKey,
} from '../../../utils/fetchers/documentsSectionFetcher'
import useGetSwrExtras from '../../../utils/useGetSwrExtras'
import { useScrollToViewIfDataChange } from '../../../utils/useScrollToViewIfDataChange'
import Button from '../../atoms/Button'
import FilteringSearchInput from '../../molecules/FilteringSearchInput'
import FiltersBackgroundWrapper from '../../molecules/FiltersBackgroundWrapper'
import PaginationMeili from '../../molecules/PaginationMeili'
import Row from '../../molecules/Row/Row'
import Section from '../../molecules/Section'
import SortSelect, { Sort } from '../../molecules/SortSelect'
import DocumentsSectionCategorySelect from './DocumentsSectionCategorySelect'
import DocumentsSectionFiletypeSelect from './DocumentsSectionFiletypeSelect'

const Documents = ({ data }: { data: SearchResponse<DocumentMeili> }) => {
  const { t } = useTranslation()
  const documentsRef = useRef<HTMLDivElement>(null)
  useScrollToViewIfDataChange(data, documentsRef)

  if (data.hits.length > 0) {
    return (
      <div className="grid space-y-3" ref={documentsRef}>
        {data.hits.map((document, index) => (
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
            linkHref={`documents/${document.slug}`}
            button={
              <Button
                variant="tertiary"
                startIcon={<DownloadIcon />}
                target="_blank"
                href={document.file?.url ?? ''}
              >
                {t('layouts.DocumentLayout.downloadFile')}
              </Button>
            }
            border={false}
          />
        ))}
      </div>
    )
  }
  return <strong>{t('components.DocumentsSection.noDocuments')}</strong>
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

  const { dataToDisplay, loadingAndNoDataToDisplay } = useGetSwrExtras({
    data,
    error,
  })

  // TODO replace by proper loading and error
  if (loadingAndNoDataToDisplay) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  }

  return (
    <>
      {/* TODO: Use loading overlay with spinner */}
      {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion */}
      <Documents data={dataToDisplay!} />

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

// TODO: Overlap with header
const DocumentsSection = ({ description }: DocumentsSectionProps) => {
  const [filters, setFilters] = useState<DocumentsSectionFilters>(documentsSectionDefaultFilters)
  const [searchInputValue, setSearchInputValue] = useState<string>('')
  const debouncedSearchInputValue = useDebounce<string>(searchInputValue, 300)

  useEffect(() => {
    setFilters({ ...filters, search: debouncedSearchInputValue, page: 1 })
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
      <FiltersBackgroundWrapper className="mb-4 grid grid-cols-1 gap-4 md:mb-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <FilteringSearchInput
            value={searchInputValue}
            onChange={(value) => setSearchInputValue(value)}
          />
        </div>
        <DocumentsSectionCategorySelect onCategoryChange={handleCategoryChange} />
        <DocumentsSectionFiletypeSelect onFiletypeChange={handleFiletypeChange} />
      </FiltersBackgroundWrapper>
      <div className="mb-6 md:w-[192px]">
        <SortSelect onChange={handleSortChange} defaultSelected={filters.sort} />
      </div>

      <div>
        <DataWrapper filters={filters} description={description} onPageChange={handlePageChange} />
      </div>
    </Section>
  )
}

export default DocumentsSection
