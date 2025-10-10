import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { SearchResponse } from 'meilisearch'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import { DownloadIcon } from '@/assets/icons'
import FormatDate from '@/components/atoms/FormatDate'
import IconButton from '@/components/atoms/IconButton'
import Loading from '@/components/atoms/Loading'
import LoadingOverlay from '@/components/atoms/LoadingOverlay'
import Select from '@/components/atoms/Select'
import FilteringSearchInput from '@/components/molecules/FilteringSearchInput'
import FiltersBackgroundWrapper from '@/components/molecules/FiltersBackgroundWrapper'
import PaginationMeili from '@/components/molecules/PaginationMeili'
import Section from '@/components/molecules/Section'
import {
  disclosuresDefaultFilters,
  DisclosuresFilters,
  getMeiliDisclosuresQueryKey,
  meiliDisclosuresFetcher,
} from '@/services/fetchers/disclosuresFetcher'
import { DisclosureMeili, DisclosureTypeFixed } from '@/services/meili/meiliTypes'
import cn from '@/utils/cn'
import { useDownloadAriaLabel } from '@/utils/useDownloadAriaLabel'
import { useHorizontalScrollFade } from '@/utils/useHorizontalScrollFade'
import { useScrollToViewIfDataChange } from '@/utils/useScrollToViewIfDataChange'

const AdditionalData = ({ additionalData }: { additionalData: Record<string, string> }) => {
  const text = useMemo(
    () =>
      additionalData
        ? Object.entries(additionalData)
            .map(([name, value]) => `${name}: ${value}`)
            .join('\n')
        : null,
    [additionalData],
  )

  if (!additionalData) {
    return null
  }

  return <span className="whitespace-pre">{text}</span>
}

const Table = ({
  data,
  filters,
}: {
  data: SearchResponse<DisclosureMeili>
  filters: DisclosuresFilters
}) => {
  const { t } = useTranslation()

  const { getDownloadAriaLabel } = useDownloadAriaLabel()

  const tableWrapperRef = useRef<HTMLDivElement>(null)
  const theadRef = useRef<HTMLTableSectionElement>(null)
  useScrollToViewIfDataChange(data, filters, theadRef)
  const { scrollFadeClassNames } = useHorizontalScrollFade({ ref: tableWrapperRef })

  // Files and additional data are present only in the old entries, no need to display them for new ones.
  const hasFiles = data.hits.some((disclosure) => disclosure.files?.length > 0)
  const hasAdditionalData = data.hits.some((disclosure) => disclosure.additionalData)

  return (
    <div className={cn('overflow-x-auto', scrollFadeClassNames)} ref={tableWrapperRef}>
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <table className="m-table colored">
        <thead ref={theadRef}>
          <tr>
            <th>{t('DisclosuresSection.th.publishedDate')}</th>
            <th>{t('DisclosuresSection.th.type')}</th>
            <th>{t('DisclosuresSection.th.internalInvoiceNumber')}</th>
            <th>{t('DisclosuresSection.th.invoiceNumberOrVariableSymbol')}</th>
            <th>{t('DisclosuresSection.th.orderNumber')}</th>
            <th>{t('DisclosuresSection.th.contractNumber')}</th>
            <th>{t('DisclosuresSection.th.description')}</th>
            <th>{t('DisclosuresSection.th.supplierName')}</th>
            <th>{t('DisclosuresSection.th.supplierAddress')}</th>
            <th>{t('DisclosuresSection.th.supplierRegistrationNumber')}</th>
            <th>{t('DisclosuresSection.th.dateOfOrder')}</th>
            <th>{t('DisclosuresSection.th.totalValue')}</th>
            <th>{t('DisclosuresSection.th.invoicedAmount')}</th>
            <th>{t('DisclosuresSection.th.dateOfDelivery')}</th>
            <th>{t('DisclosuresSection.th.signedBy')}</th>
            {hasFiles && <th>{t('DisclosuresSection.th.files')}</th>}
            {hasAdditionalData && <th>{t('DisclosuresSection.th.additionalData')}</th>}
          </tr>
        </thead>
        <tbody>
          {data.hits.map((disclosure) => (
            <tr key={disclosure.id}>
              <td>
                {disclosure.publishedAt && (
                  <FormatDate value={disclosure.publishedAt} valueType="ISO" format="articlePage" />
                )}
              </td>
              <td>{disclosure.type}</td>
              <td>{disclosure.internalInvoiceNumber}</td>
              <td>{disclosure.invoiceNumberOrVariableSymbol}</td>
              <td>{disclosure.orderNumber}</td>
              <td>{disclosure.contractNumber}</td>
              <td>{disclosure.description}</td>
              <td>{disclosure.supplierName}</td>
              <td>{disclosure.supplierAddress}</td>
              <td>{disclosure.supplierRegistrationNumber}</td>
              <td>{disclosure.dateOfOrder}</td>
              <td>{disclosure.totalValue}</td>
              <td>{disclosure.invoicedAmount}</td>
              <td>{disclosure.dateOfDelivery}</td>
              <td>{disclosure.signedBy}</td>
              {hasFiles && (
                <td>
                  {disclosure.files?.map((file, index) => (
                    <IconButton
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      variant="white"
                      className="pointer-events-auto m-auto"
                      target="_blank"
                      href={file?.url ?? ''}
                      aria-label={getDownloadAriaLabel({ attributes: file }, file.name)}
                    >
                      <DownloadIcon />
                    </IconButton>
                  ))}
                </td>
              )}
              {hasAdditionalData && (
                <td>
                  <AdditionalData additionalData={disclosure.additionalData} />
                </td>
              )}
            </tr>
          ))}
          {data.hits?.length === 0 && (
            <tr>
              <td colSpan={8}>{t('DisclosuresSection.noRecords')}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const DataWrapper = ({
  filters,
  onPageChange,
}: {
  filters: DisclosuresFilters
  onPageChange: (page: number) => void
}) => {
  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: getMeiliDisclosuresQueryKey(filters),
    queryFn: () => meiliDisclosuresFetcher(filters),
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
        <Table data={data} filters={filters} />
      </LoadingOverlay>

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

const TypeSelect = ({
  onTypeChange,
}: {
  onTypeChange: (type: DisclosureTypeFixed | null) => void
}) => {
  const { t } = useTranslation()

  return (
    <Select
      defaultSelected="all"
      options={[
        {
          key: 'all',
          label: t('DisclosuresSection.types.all'),
        },
        {
          key: DisclosureTypeFixed.Faktura,
          label: t('DisclosuresSection.types.faktury'),
        },
        {
          key: DisclosureTypeFixed.Zmluva,
          label: t('DisclosuresSection.types.zmluvy'),
        },
        {
          key: DisclosureTypeFixed.Objednavka,
          label: t('DisclosuresSection.types.objednavky'),
        },
      ]}
      onSelectionChange={(type) => {
        onTypeChange(type === 'all' ? null : (type as DisclosureTypeFixed))
      }}
    />
  )
}

const DisclosuresSection = () => {
  const [filters, setFilters] = useState<DisclosuresFilters>(disclosuresDefaultFilters)
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

  const handleTypeChange = (type: DisclosureTypeFixed | null) => {
    setFilters({ ...filters, page: 1, type })
  }

  return (
    <Section overlayWithHero>
      <FiltersBackgroundWrapper className="mb-4 grid grid-cols-1 gap-4 md:mb-6 md:grid-cols-3">
        <div>
          <TypeSelect onTypeChange={handleTypeChange} />
        </div>
        <div className="md:col-span-2">
          <FilteringSearchInput
            value={searchInputValue}
            onChange={(value) => setSearchInputValue(value)}
          />
        </div>
      </FiltersBackgroundWrapper>

      <div>
        <DataWrapper filters={filters} onPageChange={handlePageChange} />
      </div>
    </Section>
  )
}

export default DisclosuresSection
