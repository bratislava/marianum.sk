import FormatDate from '@components/atoms/FormatDate'
import Loading from '@components/atoms/Loading'
import LoadingOverlay from '@components/atoms/LoadingOverlay'
import MLink from '@components/atoms/MLink'
import CemeteryLink from '@components/molecules/CemeteryLink'
import CeremoniesDebtorsCemeterySelect from '@components/molecules/CeremoniesDebtors/CemeterySelect'
import { useGetFullPath } from '@components/molecules/Navigation/NavigationProvider/useGetFullPath'
import Section from '@components/molecules/Section'
import { CeremoniesQuery, CeremoniesSectionFragment } from '@graphql'
import { parseAbsolute, parseDate, toCalendarDate } from '@internationalized/date'
import {
  ceremoniesSectionDefaultFilters,
  ceremoniesSectionFetcher,
  CeremoniesSectionFilters,
  getCeremoniesSectionSwrKey,
} from '@services/meili/fetchers'
import {
  getCemeteryInfoInCeremoniesDebtors,
  useGetSwrExtras,
  useScrollToViewIfDataChange,
} from '@utils'
import { bratislavaTimezone } from '@utils/consts'
import groupBy from 'lodash/groupBy'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Fragment, useMemo, useRef, useState } from 'react'
import useSwr from 'swr'

const ArchiveCard = ({
  archive,
}: {
  archive: NonNullable<CeremoniesSectionFragment['archive']>
}) => {
  const router = useRouter()
  const { getFullPath } = useGetFullPath()

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't trigger the `handleCardClick` function when link clicked.
    event.stopPropagation()
  }

  const handleCardClick = () => {
    const data = archive.button?.page?.data
    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push(getFullPath(data) ?? '')
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className="mt-6 flex cursor-pointer flex-col items-center gap-y-3 bg-white px-8 py-4 md:mt-16 md:flex-row md:justify-between md:px-12 md:py-10"
      onClick={handleCardClick}
    >
      <h4>{archive.title}</h4>
      {archive.button?.page?.data?.attributes?.slug && (
        <MLink href={getFullPath(archive.button.page.data) ?? ''} onClick={handleLinkClick}>
          {archive.button?.label}
        </MLink>
      )}
    </div>
  )
}

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
      const cemeteryInfo = ceremony?.attributes?.cemetery?.data
        ? getCemeteryInfoInCeremoniesDebtors(ceremony.attributes.cemetery.data, i18n.language)
        : null

      const cemetery = cemeteryInfo?.slug ? (
        <CemeteryLink slug={cemeteryInfo?.slug} title={cemeteryInfo?.title ?? ''} />
      ) : (
        cemeteryInfo?.title
      )

      const dateTimeZoned = parseAbsolute(ceremony.attributes?.dateTime, bratislavaTimezone)
      const calendarDate = toCalendarDate(dateTimeZoned)

      return { ...ceremony.attributes, calendarDate, dateTime: dateTimeZoned.toDate(), cemetery }
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
                  <th>{t('th.cemeteryTitle')}</th>
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
                    <td>{ceremony.cemetery}</td>
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

      {section.archive && <ArchiveCard archive={section.archive} />}
    </Section>
  )
}

export default CeremoniesSection
