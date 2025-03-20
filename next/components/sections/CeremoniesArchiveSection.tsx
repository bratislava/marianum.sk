import { keepPreviousData, useQuery } from '@tanstack/react-query'
import cx from 'classnames'
import { SearchResponse } from 'meilisearch'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import FormatDate from '@/components/atoms/FormatDate'
import Loading from '@/components/atoms/Loading'
import LoadingOverlay from '@/components/atoms/LoadingOverlay'
import CemeteryLink from '@/components/molecules/CemeteryLink'
import CeremoniesDebtorsCemeterySelect from '@/components/molecules/CeremoniesDebtors/CemeterySelect'
import FilteringSearchInput from '@/components/molecules/FilteringSearchInput'
import FiltersBackgroundWrapper from '@/components/molecules/FiltersBackgroundWrapper'
import PaginationMeili from '@/components/molecules/PaginationMeili'
import Section from '@/components/molecules/Section'
import {
  ceremoniesArchiveSectionDefaultFilters,
  ceremoniesArchiveSectionFetcher,
  CeremoniesArchiveSectionFilters,
  getCeremoniesArchiveSectionQueryKey,
} from '@/services/fetchers/ceremoniesArchiveSectionFetcher'
import { CeremonyMeili } from '@/services/meili/meiliTypes'
import { getCemeteryInfoInCeremoniesDebtorsMeili } from '@/utils/getCemeteryInfoInCeremoniesDebtors'
import { useHorizontalScrollFade } from '@/utils/useHorizontalScrollFade'
import { useScrollToViewIfDataChange } from '@/utils/useScrollToViewIfDataChange'

const PrivateField = () => <span className="opacity-50">**</span>

const Table = ({
  data,
  filters,
}: {
  data: SearchResponse<CeremonyMeili>
  filters: CeremoniesArchiveSectionFilters
}) => {
  const { t, i18n } = useTranslation()

  const tableWrapperRef = useRef<HTMLDivElement>(null)
  const theadRef = useRef<HTMLTableSectionElement>(null)
  useScrollToViewIfDataChange(data, filters, theadRef)
  const { scrollFadeClassNames } = useHorizontalScrollFade({ ref: tableWrapperRef })

  const ceremonies = useMemo(() => {
    const ceremoniesData = data.hits
    if (!ceremoniesData) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      return undefined
    }
    if (ceremoniesData?.length === 0) {
      return []
    }

    return ceremoniesData.map((ceremony) => {
      const dateTime = new Date(ceremony.dateTime)
      const { title, slug } = getCemeteryInfoInCeremoniesDebtorsMeili(
        ceremony.cemetery,
        i18n.language,
      )

      const cemetery = slug ? <CemeteryLink slug={slug} title={title} /> : title

      return {
        ...ceremony,
        dateTime,
        cemetery,
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <>
      <div
        className={cx('mb-6 overflow-x-auto md:mb-10', scrollFadeClassNames)}
        ref={tableWrapperRef}
      >
        {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
        <table className="m-table colored">
          <thead ref={theadRef}>
            <tr>
              <th>{t('CeremoniesSection.th.dateTime')}</th>
              <th>{t('CeremoniesSection.th.name')}</th>
              <th>{t('CeremoniesSection.th.birthYear')}</th>
              <th>{t('CeremoniesSection.th.cemeteryTitle')}</th>
              <th>{t('CeremoniesSection.th.type')}</th>
              <th>{t('CeremoniesSection.th.company')}</th>
              <th>{t('CeremoniesSection.th.officiantProvidedBy')}</th>
            </tr>
          </thead>
          <tbody>
            {ceremonies?.map((ceremony) => (
              <tr key={ceremony.id}>
                <td>
                  {ceremony.dateTime && (
                    <FormatDate value={ceremony.dateTime} format="ceremoniesArchive" />
                  )}
                </td>
                <td>{ceremony.consentForPrivateFields ? ceremony.name : <PrivateField />}</td>
                <td>{ceremony.consentForPrivateFields ? ceremony.birthYear : <PrivateField />}</td>
                <td>{ceremony.cemetery}</td>
                <td>{ceremony.consentForPrivateFields ? ceremony.type : <PrivateField />}</td>
                <td>{ceremony.company}</td>
                <td>{ceremony.officiantProvidedBy}</td>
              </tr>
            ))}
            {ceremonies?.length === 0 && (
              <tr>
                <td colSpan={7}>{t('CeremoniesSection.noCeremonies')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p>
        <PrivateField /> {t('CeremoniesSection.privateFieldsDescription')}
      </p>
    </>
  )
}

const DataWrapper = ({
  filters,
  onPageChange,
}: {
  filters: CeremoniesArchiveSectionFilters
  onPageChange: (page: number) => void
}) => {
  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: getCeremoniesArchiveSectionQueryKey(filters),
    queryFn: () => ceremoniesArchiveSectionFetcher(filters),
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

const CeremoniesArchiveSection = () => {
  const [filters, setFilters] = useState<CeremoniesArchiveSectionFilters>(
    ceremoniesArchiveSectionDefaultFilters,
  )
  const [searchInputValue, setSearchInputValue] = useState<string>('')
  const [debouncedSearchInputValue] = useDebounceValue<string>(searchInputValue, 300)

  useEffect(() => {
    if (filters.search !== debouncedSearchInputValue) {
      setFilters({
        ...filters,
        search: debouncedSearchInputValue,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchInputValue])

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  const handleCemeteryChange = (cemeteryId: string) => {
    setFilters({ ...filters, cemeteryId })
  }

  return (
    <Section overlayWithHero>
      <FiltersBackgroundWrapper className="mb-4 grid grid-cols-1 gap-4 md:mb-6 md:grid-cols-3">
        <div>
          <CeremoniesDebtorsCemeterySelect
            type="ceremonies"
            onCemeteryChange={handleCemeteryChange}
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
        <DataWrapper filters={filters} onPageChange={handlePageChange} />
      </div>
    </Section>
  )
}

export default CeremoniesArchiveSection
