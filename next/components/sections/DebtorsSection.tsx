import cx from 'classnames'
import { SearchResponse } from 'meilisearch'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useRef, useState } from 'react'
import { SingleValue } from 'react-select'
import useSwr from 'swr'
import { useDebounce } from 'usehooks-ts'

import Loading from '@/components/atoms/Loading'
import LoadingOverlay from '@/components/atoms/LoadingOverlay'
import { SelectOption } from '@/components/atoms/Select'
import CemeteryLink from '@/components/molecules/CemeteryLink'
import CeremoniesDebtorsCemeterySelect from '@/components/molecules/CeremoniesDebtors/CemeterySelect'
import FilteringSearchInput from '@/components/molecules/FilteringSearchInput'
import FiltersBackgroundWrapper from '@/components/molecules/FiltersBackgroundWrapper'
import PaginationMeili from '@/components/molecules/PaginationMeili'
import Section from '@/components/molecules/Section'
import {
  debtorsSectionDefaultFilters,
  debtorsSectionFetcher,
  DebtorsSectionFilters,
  getDebtorsSectionSwrKey,
} from '@/services/fetchers/debtorsSectionFetcher'
import { DebtorMeili } from '@/services/meili/meiliTypes'
import { getCemeteryInfoInCeremoniesDebtorsMeili } from '@/utils/getCemeteryInfoInCeremoniesDebtors'
import { useGetSwrExtras } from '@/utils/useGetSwrExtras'
import { useHorizontalScrollFade } from '@/utils/useHorizontalScrollFade'
import { useScrollToViewIfDataChange } from '@/utils/useScrollToViewIfDataChange'

const Table = ({
  data,
  filters,
}: {
  data: SearchResponse<DebtorMeili>
  filters: DebtorsSectionFilters
}) => {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'DebtorsSection' })

  const tableWrapperRef = useRef<HTMLDivElement>(null)
  const theadRef = useRef<HTMLTableSectionElement>(null)
  useScrollToViewIfDataChange(data, filters, theadRef)
  const { scrollFadeClassNames } = useHorizontalScrollFade({ ref: tableWrapperRef })

  const debtors = useMemo(() => {
    const debtorsData = data.hits
    if (!debtorsData) {
      // eslint-disable-next-line unicorn/no-useless-undefined
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
    <div className={cx('overflow-x-auto', scrollFadeClassNames)} ref={tableWrapperRef}>
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <table className="m-table colored">
        <thead ref={theadRef}>
          <tr>
            <th>{t('th.cemeteryTitle')}</th>
            <th>{t('th.graveSector')}</th>
            <th>{t('th.graveNumber')}</th>
            <th>{t('th.gravePreviousNumber')}</th>
            <th>{t('th.firstName')}</th>
            <th>{t('th.lastName')}</th>
            <th>{t('th.birthDate')}</th>
            <th>{t('th.deathDate')}</th>
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
              <td colSpan={8}>{t('noRecords')}</td>
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
  filters: DebtorsSectionFilters
  description?: string | null
  onPageChange: (page: number) => void
}) => {
  const { data, error } = useSwr(getDebtorsSectionSwrKey(filters), debtorsSectionFetcher(filters))

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
        <Table data={dataToDisplay!} filters={filters} />
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

type DebtorsSectionProps = {
  description?: string | null
}

const DebtorsSection = ({ description }: DebtorsSectionProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'CemeterySelect' })

  const [filters, setFilters] = useState<DebtorsSectionFilters>(debtorsSectionDefaultFilters)
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

  // Selection

  const defaultOption = { value: 'all', label: t('allCemeteries') }

  const [selection, setSelection] = useState(defaultOption.value)

  const handleSelectionChange = (option: SingleValue<SelectOption> | null) => {
    setSelection(option?.value ?? defaultOption.value)
  }

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: 1,
      cemeteryId: selection === 'all' ? null : selection,
    }))
  }, [selection])

  return (
    <Section overlayWithHero>
      <FiltersBackgroundWrapper className="mb-4 grid grid-cols-1 gap-4 md:mb-6 md:grid-cols-3">
        <div>
          <CeremoniesDebtorsCemeterySelect
            type="debtors"
            defaultOption={defaultOption}
            onCemeteryChange={handleSelectionChange}
          />
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
