import { SearchResponse } from 'meilisearch'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useRef, useState } from 'react'
import useSwr from 'swr'
import { useDebounce } from 'usehooks-ts'

import { CeremonyMeili } from '../../types/meiliTypes'
import { getBranchInfoInCeremoniesDebtorsMeili } from '../../utils/getBranchInfoInCeremoniesDebtors'
import { isDefined } from '../../utils/isDefined'
import { meiliClient } from '../../utils/meilisearch'
import useGetSwrExtras from '../../utils/useGetSwrExtras'
import { useScrollToViewIfDataChange } from '../../utils/useScrollToViewIfDataChange'
import FormatDate from '../atoms/FormatDate'
import BranchLink from '../molecules/BranchLink'
import CeremoniesDebtorsBranchSelect from '../molecules/CeremoniesDebtors/BranchSelect'
import FilteringSearchInput from '../molecules/FilteringSearchInput'
import FiltersBackgroundWrapper from '../molecules/FiltersBackgroundWrapper'
import PaginationMeili from '../molecules/PaginationMeili'
import Section from '../molecules/Section'

const pageSize = 20

type Filters = {
  search: string
  branchId: string | null
  page: number
}

const PrivateField = () => <span className="opacity-50">**</span>

const Table = ({ data }: { data: SearchResponse<CeremonyMeili> }) => {
  const { t, i18n } = useTranslation('common', {
    keyPrefix: 'sections.CeremoniesSection',
  })
  const theadRef = useRef<HTMLTableSectionElement>(null)
  useScrollToViewIfDataChange(data, theadRef)

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
      const { title, slug } = getBranchInfoInCeremoniesDebtorsMeili(ceremony.branch, i18n.language)

      const branch = slug ? <BranchLink slug={slug} title={title} /> : title

      return {
        ...ceremony,
        dateTime,
        branch,
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <>
      <div className="mb-6 overflow-x-auto md:mb-10">
        {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
        <table className="m-table colored">
          <thead ref={theadRef}>
            <tr>
              <th>{t('dateTime')}</th>
              <th>{t('name')}</th>
              <th>{t('birthYear')}</th>
              <th>{t('branchTitle')}</th>
              <th>{t('type')}</th>
              <th>{t('company')}</th>
              <th>{t('officiantProvidedBy')}</th>
            </tr>
          </thead>
          <tbody>
            {ceremonies?.map((ceremony, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <tr key={index}>
                <td>
                  {ceremony.dateTime && (
                    <FormatDate value={ceremony.dateTime} format="ceremoniesArchive" />
                  )}
                </td>
                <td>{ceremony.consentForPrivateFields ? ceremony.name : <PrivateField />}</td>
                <td>{ceremony.consentForPrivateFields ? ceremony.birthYear : <PrivateField />}</td>
                <td>{ceremony.branch}</td>
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
  filters: Filters
  onPageChange: (page: number) => void
}) => {
  const { data, error } = useSwr(['CeremoniesArchive', filters], () => {
    return meiliClient.index('ceremony').search<CeremonyMeili>(filters.search, {
      limit: pageSize,
      offset: (filters.page - 1) * pageSize,
      filter: [
        `dateTimeTimestamp < ${Date.now()}`,
        filters.branchId && `branch.id = ${filters.branchId}`,
      ].filter(isDefined),
    })
  })

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
      {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
      <Table data={dataToDisplay!} />

      {dataToDisplay ? (
        <PaginationMeili
          data={dataToDisplay}
          pageSize={pageSize}
          selectedPage={filters.page}
          onPageChange={onPageChange}
        />
      ) : null}
    </>
  )
}

const CeremoniesArchiveSection = () => {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    page: 1,
    branchId: null,
  })
  const [searchInputValue, setSearchInputValue] = useState<string>('')
  const debouncedSearchInputValue = useDebounce<string>(searchInputValue, 300)

  useEffect(() => {
    setFilters({
      ...filters,
      search: debouncedSearchInputValue,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchInputValue])

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  const handleBranchChange = (branchId: string) => {
    setFilters({ ...filters, branchId })
  }

  return (
    <Section overlayWithHero>
      <FiltersBackgroundWrapper className="mb-4 grid grid-cols-1 gap-4 bg-white md:mb-6 md:grid-cols-3">
        <div>
          <CeremoniesDebtorsBranchSelect type="ceremonies" onBranchChange={handleBranchChange} />
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
