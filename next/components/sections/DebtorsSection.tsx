import { SearchResponse } from 'meilisearch'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useState } from 'react'
import useSwr from 'swr'
import { useDebounce } from 'usehooks-ts'

import SearchIcon from '../../assets/search.svg'
import { DebtorMeili } from '../../types/meiliTypes'
import { getBranchTitleInCeremoniesDebtorsMeili } from '../../utils/getBranchTitleInCeremoniesDebtors'
import { meiliClient } from '../../utils/meilisearch'
import useGetSwrExtras from '../../utils/useGetSwrExtras'
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

const Table = ({ data }: { data: SearchResponse<DebtorMeili> }) => {
  const { t, i18n } = useTranslation('common', {
    keyPrefix: 'sections.DebtorsSection',
  })

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
      return {
        ...debtor,
        branchTitle: getBranchTitleInCeremoniesDebtorsMeili(debtor.branch, i18n.language),
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div className="overflow-x-auto">
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <table className="m-table colored">
        <thead>
          <tr>
            <th>{t('branchTitle')}</th>
            <th>{t('graveSector')}</th>
            <th>{t('graveNumber')}</th>
            <th>{t('gravePreviousNumber')}</th>
            <th>{t('firstName')}</th>
            <th>{t('lastName')}</th>
            <th>{t('birthDate')}</th>
            <th>{t('deathDate')}</th>
          </tr>
        </thead>
        <tbody>
          {debtors?.map((debtor, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={index}>
              {/* TODO: Branch link */}
              <td>{debtor.branchTitle}</td>
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
              <td colSpan={7}>{t('noRecords')}</td>
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
  filters: Filters
  description?: string | null
  onPageChange: (page: number) => void
}) => {
  const { data, error } = useSwr(['Debtors', filters], () => {
    return meiliClient.index('debtor').search<DebtorMeili>(filters.search, {
      limit: pageSize,
      offset: (filters.page - 1) * pageSize,
      filter: filters.branchId ? [`branch.id = ${filters.branchId}`] : [],
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
      {/* TODO: Use loading overlay with spinner */}
      {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion */}
      <Table data={dataToDisplay!} />

      {description && <p className="pt-4 md:pt-6">{description}</p>}
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

type DebtorsSectionProps = {
  description?: string | null
}

// TODO: Overlap with header
const DebtorsSection = ({ description }: DebtorsSectionProps) => {
  const { t } = useTranslation('common', {
    keyPrefix: 'sections.DebtorsSection',
  })

  const [filters, setFilters] = useState<Filters>({ search: '', page: 1, branchId: null })
  const [searchInputValue, setSearchInputValue] = useState<string>('')
  const debouncedSearchInputValue = useDebounce<string>(searchInputValue, 300)

  useEffect(() => {
    setFilters({ ...filters, search: debouncedSearchInputValue, page: 1 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchInputValue])

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  const handleBranchChange = (branchId: string) => {
    setFilters({ ...filters, page: 1, branchId })
  }

  return (
    <Section>
      <div className="mb-4 grid grid-cols-1 gap-4 bg-white md:mb-6 md:grid-cols-3 md:p-6">
        <div>
          <CeremoniesDebtorsBranchSelect type="debtors" onBranchChange={handleBranchChange} />
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
        <DataWrapper filters={filters} description={description} onPageChange={handlePageChange} />
      </div>
    </Section>
  )
}

export default DebtorsSection
