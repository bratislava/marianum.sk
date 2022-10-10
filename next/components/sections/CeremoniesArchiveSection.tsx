import { SearchResponse } from 'meilisearch'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useState } from 'react'
import useSwr from 'swr'
import { useDebounce } from 'usehooks-ts'

import SearchIcon from '../../assets/search.svg'
import { CeremonyMeili } from '../../types/meiliTypes'
import { getBranchTitleInCeremoniesDebtorsMeili } from '../../utils/getBranchTitleInCeremoniesDebtors'
import { isDefined } from '../../utils/isDefined'
import { meiliClient } from '../../utils/meilisearch'
import useGetSwrExtras from '../../utils/useGetSwrExtras'
import FormatDate from '../atoms/FormatDate'
import Pagination from '../atoms/Pagination/Pagination'
import TextField from '../atoms/TextField'
import CeremoniesDebtorsBranchSelect from '../molecules/CeremoniesDebtors/BranchSelect'
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

      return {
        ...ceremony,
        dateTime,
        branchTitle: getBranchTitleInCeremoniesDebtorsMeili(ceremony.branch, i18n.language),
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <>
      <div className="mb-6 overflow-x-auto md:mb-10">
        {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
        <table className="m-table colored">
          <thead>
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
                {/* TODO: Branch link */}
                <td>{ceremony.branchTitle}</td>
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

  const pageCount = dataToDisplay ? Math.ceil(dataToDisplay.estimatedTotalHits / pageSize) : 0

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
      <Table data={dataToDisplay!} />

      {pageCount > 0 && (
        <Pagination
          className="flex justify-center pt-4 md:pt-6"
          selectedPage={filters.page}
          count={pageCount}
          onChange={onPageChange}
        />
      )}
    </>
  )
}

const CeremoniesArchiveSection = () => {
  const { t } = useTranslation('common', {
    keyPrefix: 'sections.CeremoniesSection',
  })

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
    <Section>
      <div className="mb-4 grid grid-cols-1 gap-4 bg-white md:mb-6 md:grid-cols-3 md:p-6">
        <div>
          <CeremoniesDebtorsBranchSelect type="ceremonies" onBranchChange={handleBranchChange} />
        </div>
        <div className="md:col-span-2">
          <TextField
            id="with-text-left-icon"
            defaultValue={searchInputValue}
            leftSlot={
              <button type="button" className="p-2">
                <SearchIcon />
              </button>
            }
            placeholder={t('searchPlaceholder')}
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
        </div>
      </div>

      <div>
        <DataWrapper filters={filters} onPageChange={handlePageChange} />
      </div>
    </Section>
  )
}

export default CeremoniesArchiveSection
