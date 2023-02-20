import FormatDate from '@components/atoms/FormatDate'
import Loading from '@components/atoms/Loading'
import LoadingOverlay from '@components/atoms/LoadingOverlay'
import CemeteryLink from '@components/molecules/CemeteryLink'
import CeremoniesDebtorsCemeterySelect from '@components/molecules/CeremoniesDebtors/CemeterySelect'
import FilteringSearchInput from '@components/molecules/FilteringSearchInput'
import FiltersBackgroundWrapper from '@components/molecules/FiltersBackgroundWrapper'
import PaginationMeili from '@components/molecules/PaginationMeili'
import Section from '@components/molecules/Section'
import {
  ceremoniesArchiveSectionDefaultFilters,
  ceremoniesArchiveSectionFetcher,
  CeremoniesArchiveSectionFilters,
  getCeremoniesArchiveSectionSwrKey,
} from '@services/fetchers/ceremoniesArchiveSectionFetcher'
import { CeremonyMeili } from '@services/meili/meiliTypes'
import { getCemeteryInfoInCeremoniesDebtorsMeili } from '@utils/getCemeteryInfoInCeremoniesDebtors'
import { useGetSwrExtras } from '@utils/useGetSwrExtras'
import { useHorizontalScrollFade } from '@utils/useHorizontalScrollFade'
import { useScrollToViewIfDataChange } from '@utils/useScrollToViewIfDataChange'
import cx from 'classnames'
import { SearchResponse } from 'meilisearch'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useRef, useState } from 'react'
import useSwr from 'swr'
import { useDebounce } from 'usehooks-ts'

const PrivateField = () => <span className="opacity-50">**</span>

const Table = ({
  data,
  filters,
}: {
  data: SearchResponse<CeremonyMeili>
  filters: CeremoniesArchiveSectionFilters
}) => {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'CeremoniesSection' })

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
              <th>{t('th.dateTime')}</th>
              <th>{t('th.name')}</th>
              <th>{t('th.birthYear')}</th>
              <th>{t('th.cemeteryTitle')}</th>
              <th>{t('th.type')}</th>
              <th>{t('th.company')}</th>
              <th>{t('th.officiantProvidedBy')}</th>
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
                <td colSpan={7}>{t('noCeremonies')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p>
        <PrivateField /> {t('privateFieldsDescription')}
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
  const { data, error } = useSwr(
    getCeremoniesArchiveSectionSwrKey(filters),
    ceremoniesArchiveSectionFetcher(filters),
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
        <Table data={dataToDisplay!} filters={filters} />
      </LoadingOverlay>

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

const CeremoniesArchiveSection = () => {
  const [filters, setFilters] = useState<CeremoniesArchiveSectionFilters>(
    ceremoniesArchiveSectionDefaultFilters,
  )
  const [searchInputValue, setSearchInputValue] = useState<string>('')
  const debouncedSearchInputValue = useDebounce<string>(searchInputValue, 300)

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
