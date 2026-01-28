import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { SearchResponse } from 'meilisearch'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import Loading from '@/components/atoms/Loading'
import LoadingOverlay from '@/components/atoms/LoadingOverlay'
import CemeteryLink from '@/components/molecules/CemeteryLink'
import CeremoniesDebtorsCemeterySelect from '@/components/molecules/CeremoniesDebtors/CemeterySelect'
import FilteringSearchInput from '@/components/molecules/FilteringSearchInput'
import FiltersBackgroundWrapper from '@/components/molecules/FiltersBackgroundWrapper'
import PaginationMeili from '@/components/molecules/PaginationMeili'
import Section from '@/components/molecules/Section'
import {
  debtorsDefaultFilters,
  DebtorsFilters,
  getMeiliDebtorsQueryKey,
  meiliDebtorsFetcher,
} from '@/services/fetchers/debtorsFetcher'
import { DebtorMeili } from '@/services/meili/meiliTypes'
import cn from '@/utils/cn'
import { getCemeteryInfoInCeremoniesDebtorsMeili } from '@/utils/getCemeteryInfoInCeremoniesDebtors'
import { useHorizontalScrollFade } from '@/utils/useHorizontalScrollFade'
import { useScrollToViewIfDataChange } from '@/utils/useScrollToViewIfDataChange'

const Table = ({
  data,
  filters,
}: {
  data: SearchResponse<DebtorMeili>
  filters: DebtorsFilters
}) => {
  const { t, i18n } = useTranslation()

  const tableWrapperRef = useRef<HTMLDivElement>(null)
  const theadRef = useRef<HTMLTableSectionElement>(null)
  useScrollToViewIfDataChange(data, filters, theadRef)
  const { scrollFadeClassNames } = useHorizontalScrollFade({ ref: tableWrapperRef })

  const debtors = useMemo(() => {
    const debtorsData = data.hits
    if (!debtorsData) {
      return undefined
    }
    if (debtorsData?.length === 0) {
      return []
    }

    return debtorsData.map((debtor) => {
      const { title, slug } = getCemeteryInfoInCeremoniesDebtorsMeili(
        debtor.cemetery,
        i18n.language,
      )

      const cemetery = slug ? <CemeteryLink slug={slug} title={title} /> : title

      return {
        ...debtor,
        cemetery,
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div className={cn('overflow-x-auto', scrollFadeClassNames)} ref={tableWrapperRef}>
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <table className="m-table colored">
        <thead ref={theadRef}>
          <tr>
            <th>{t('DebtorsSection.th.cemeteryTitle')}</th>
            <th>{t('DebtorsSection.th.graveSector')}</th>
            <th>{t('DebtorsSection.th.graveNumber')}</th>
            <th>{t('DebtorsSection.th.gravePreviousNumber')}</th>
            <th>{t('DebtorsSection.th.firstName')}</th>
            <th>{t('DebtorsSection.th.lastName')}</th>
            <th>{t('DebtorsSection.th.birthDate')}</th>
            <th>{t('DebtorsSection.th.deathDate')}</th>
          </tr>
        </thead>
        <tbody>
          {debtors?.map((debtor) => (
            <tr key={debtor.id}>
              <td>{debtor.cemetery}</td>
              <td>{debtor.graveSector}</td>
              <td>{debtor.graveNumber}</td>
              <td>{debtor.gravePreviousNumber}</td>
              <td>{debtor.firstName}</td>
              <td>{debtor.lastName}</td>
              <td>{debtor.birthDate}</td>
              <td>{debtor.deathDate}</td>
            </tr>
          ))}
          {debtors?.length === 0 && (
            <tr>
              <td colSpan={8}>{t('DebtorsSection.noRecords')}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const DataWrapper = ({
  filters,
  description,
  onPageChange,
}: {
  filters: DebtorsFilters
  description?: string | null
  onPageChange: (page: number) => void
}) => {
  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: getMeiliDebtorsQueryKey(filters),
    queryFn: () => meiliDebtorsFetcher(filters),
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

type DebtorsSectionProps = {
  description?: string | null
}

const DebtorsSection = ({ description }: DebtorsSectionProps) => {
  const [filters, setFilters] = useState<DebtorsFilters>(debtorsDefaultFilters)
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

  const handleCemeteryChange = (cemeteryId: string | null) => {
    setFilters({ ...filters, page: 1, cemeteryId })
  }

  return (
    <Section overlayWithHero>
      <FiltersBackgroundWrapper className="mb-4 grid grid-cols-1 gap-4 md:mb-6 md:grid-cols-3">
        <div>
          <CeremoniesDebtorsCemeterySelect type="debtors" onCemeteryChange={handleCemeteryChange} />
        </div>
        <div className="md:col-span-2">
          <FilteringSearchInput
            value={searchInputValue}
            onChange={(value) => setSearchInputValue(value)}
          />
        </div>
      </FiltersBackgroundWrapper>

      <div>
        <DataWrapper filters={filters} description={description} onPageChange={handlePageChange} />
      </div>
    </Section>
  )
}

export default DebtorsSection
