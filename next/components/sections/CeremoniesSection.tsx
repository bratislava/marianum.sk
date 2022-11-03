import { parseAbsolute, parseDate, toCalendarDate } from '@internationalized/date'
import groupBy from 'lodash/groupBy'
import { useTranslation } from 'next-i18next'
import { Fragment, useMemo, useRef, useState } from 'react'
import useSwr from 'swr'

import { CeremoniesQuery, CeremoniesSectionFragment } from '../../graphql'
import { bratislavaTimezone } from '../../utils/consts'
import {
  ceremoniesSectionDefaultFilters,
  ceremoniesSectionFetcher,
  CeremoniesSectionFilters,
  getCeremoniesSectionSwrKey,
} from '../../utils/fetchers/ceremoniesSectionFetcher'
import { getCemeteryInfoInCeremoniesDebtors } from '../../utils/getBranchInfoInCeremoniesDebtors'
import useGetSwrExtras from '../../utils/useGetSwrExtras'
import { useScrollToViewIfDataChange } from '../../utils/useScrollToViewIfDataChange'
import FormatDate from '../atoms/FormatDate'
import Loading from '../atoms/Loading'
import LoadingOverlay from '../atoms/LoadingOverlay'
import MLink from '../atoms/MLink'
import CemeteryLink from '../molecules/CemeteryLink'
import CeremoniesDebtorsCemeterySelect from '../molecules/CeremoniesDebtors/CemeterySelect'
import { useGetFullPath } from '../molecules/Navigation/NavigationProvider/useGetFullPath'
import Section from '../molecules/Section'

const PrivateField = () => <span className="opacity-50">**</span>

const Table = ({ data, filters }: { data: CeremoniesQuery; filters: CeremoniesSectionFilters }) => {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'CeremoniesSection' })

  const theadRef = useRef<HTMLTableSectionElement>(null)
  useScrollToViewIfDataChange(data, filters, theadRef)

  const ceremonies = useMemo(() => {
    const ceremoniesData = data?.ceremonies?.data
    if (!ceremoniesData) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      return undefined
    }
    if (ceremoniesData?.length === 0) {
      return []
    }

    const mappedCeremonies = ceremoniesData.map((ceremony) => {
      const branchInfo = ceremony?.attributes?.cemetery?.data
        ? getCemeteryInfoInCeremoniesDebtors(ceremony.attributes.cemetery.data, i18n.language)
        : null

      const branch = branchInfo?.slug ? (
        <CemeteryLink slug={branchInfo?.slug} title={branchInfo?.title ?? ''} />
      ) : (
        branchInfo?.title
      )

      const dateTimeZoned = parseAbsolute(ceremony.attributes?.dateTime, bratislavaTimezone)
      const calendarDate = toCalendarDate(dateTimeZoned)

      return { ...ceremony.attributes, calendarDate, dateTime: dateTimeZoned.toDate(), branch }
    })

    // eslint-disable-next-line lodash/prop-shorthand
    const groupedByDate = groupBy(mappedCeremonies, (ceremony) => ceremony.calendarDate)

    return Object.entries(groupedByDate).map(([date, list]) => ({
      date,
      list,
      parsedDate: parseDate(date).toDate(bratislavaTimezone),
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div>
      {ceremonies?.map(({ parsedDate, list }, dateIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={dateIndex}>
          <span className="mb-4 block text-h5 font-semibold">
            <FormatDate value={parsedDate} format="ceremoniesDate" />
          </span>
          {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
          <div className="mb-6 overflow-x-auto md:mb-10">
            {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
            <table className="m-table">
              <thead ref={theadRef}>
                <tr>
                  <th>{t('th.time')}</th>
                  <th>{t('th.name')}</th>
                  <th>{t('th.birthYear')}</th>
                  <th>{t('th.branchTitle')}</th>
                  <th>{t('th.type')}</th>
                  <th>{t('th.company')}</th>
                  <th>{t('th.officiantProvidedBy')}</th>
                </tr>
              </thead>
              <tbody>
                {list?.map((ceremony, ceremonyIndex) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <tr key={ceremonyIndex}>
                    <td>
                      {ceremony.dateTime && (
                        <FormatDate value={ceremony.dateTime} format="ceremoniesTime" />
                      )}
                    </td>
                    <td>{ceremony.consentForPrivateFields ? ceremony.name : <PrivateField />}</td>
                    <td>
                      {ceremony.consentForPrivateFields ? ceremony.birthYear : <PrivateField />}
                    </td>
                    <td>{ceremony.branch}</td>
                    <td>{ceremony.consentForPrivateFields ? ceremony.type : <PrivateField />}</td>
                    <td>{ceremony.company}</td>
                    <td>{ceremony.officiantProvidedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Fragment>
      ))}
      {ceremonies?.length === 0 && (
        <div className="mb-6 md:mb-10">
          <strong>{t('noCeremonies')}</strong>
        </div>
      )}
      <p>
        <PrivateField /> {t('privateFieldsDescription')}
      </p>
    </div>
  )
}

const DataWrapper = ({ filters }: { filters: CeremoniesSectionFilters }) => {
  const { data, error } = useSwr(
    getCeremoniesSectionSwrKey(filters),
    ceremoniesSectionFetcher(filters),
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
    <LoadingOverlay loading={delayedLoading}>
      {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion */}
      <Table data={dataToDisplay!} filters={filters} />
    </LoadingOverlay>
  )
}

type CeremoniesSectionProps = {
  section: CeremoniesSectionFragment
}

const CeremoniesSection = ({ section }: CeremoniesSectionProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'CeremoniesSection' })

  const { getFullPath } = useGetFullPath()
  const [filters, setFilters] = useState<CeremoniesSectionFilters>(ceremoniesSectionDefaultFilters)

  const handleCemeteryChange = (cemeteryId: string) => {
    setFilters({ ...filters, cemeteryId })
  }

  return (
    <Section>
      <div className="mb-6 md:mb-8 md:w-[360px]">
        <CeremoniesDebtorsCemeterySelect
          label={t('filterBy')}
          type="ceremonies"
          onCemeteryChange={handleCemeteryChange}
        />
      </div>

      <div>
        <DataWrapper filters={filters} />
      </div>

      {section.archive && (
        <div className="mt-6 flex flex-col items-center gap-y-3 bg-white px-8 py-4 md:mt-16 md:flex-row md:justify-between md:px-12 md:py-10">
          <h4>{section.archive.title}</h4>
          {section.archive.button?.page?.data?.attributes?.slug && (
            <MLink href={getFullPath(section.archive.button.page.data) ?? ''}>
              {section.archive.button?.label}
            </MLink>
          )}
        </div>
      )}
    </Section>
  )
}

export default CeremoniesSection
