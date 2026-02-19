import { parseAbsolute, parseDate, toCalendarDate } from '@internationalized/date'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import groupBy from 'lodash/groupBy'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Fragment, PropsWithChildren, useMemo, useRef, useState } from 'react'

import FormatDate from '@/components/atoms/FormatDate'
import Loading from '@/components/atoms/Loading'
import LoadingOverlay from '@/components/atoms/LoadingOverlay'
import MLink from '@/components/atoms/MLink'
import RowBox from '@/components/atoms/Row/RowBox'
import CemeteryLink from '@/components/molecules/CemeteryLink'
import CeremoniesDebtorsCemeterySelect from '@/components/molecules/CeremoniesDebtors/CemeterySelect'
import { useGetLinkProps } from '@/components/molecules/Navigation/NavigationProvider/useGetLinkProps'
import Section from '@/components/molecules/Section'
import { CeremoniesQuery, CeremoniesSectionFragment } from '@/graphql'
import {
  ceremoniesSectionDefaultFilters,
  ceremoniesSectionFetcher,
  CeremoniesSectionFilters,
  getCeremoniesSectionQueryKey,
} from '@/services/fetchers/ceremonies/ceremoniesSectionFetcher'
import cn from '@/utils/cn'
import { bratislavaTimezone } from '@/utils/consts'
import { getCemeteryInfoFromCeremony } from '@/utils/getCemeteryInfoInCeremoniesDebtors'
import { useHorizontalScrollFade } from '@/utils/useHorizontalScrollFade'
import { useScrollToViewIfDataChange } from '@/utils/useScrollToViewIfDataChange'

const ArchiveCard = ({
  archive,
}: {
  archive: NonNullable<CeremoniesSectionFragment['archive']>
}) => {
  const router = useRouter()
  const { getLinkProps } = useGetLinkProps()

  const linkProps = getLinkProps(archive.button)

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't trigger the `handleCardClick` function when link clicked.
    event.stopPropagation()
  }

  const handleCardClick = () => {
    if (archive.button) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push(linkProps.href)
    }
  }

  return (
    <RowBox hover={false} className="mt-6 cursor-pointer md:mt-16">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className="flex flex-col items-center gap-y-3 px-8 py-4 md:flex-row md:justify-between md:px-12 md:py-10"
        onClick={handleCardClick}
      >
        <h4>{archive.title}</h4>
        {archive.button && (
          <MLink href={linkProps.href ?? ''} onClick={handleLinkClick}>
            {linkProps.label}
          </MLink>
        )}
      </div>
    </RowBox>
  )
}

const PrivateField = () => <span className="opacity-50">**</span>

const TableWrapper = ({ children }: PropsWithChildren) => {
  const tableWrapperRef = useRef<HTMLDivElement>(null)

  const { scrollFadeClassNames } = useHorizontalScrollFade({ ref: tableWrapperRef })

  return (
    <div className="relative">
      <div
        className={cn('mb-6 overflow-x-auto md:mb-10', scrollFadeClassNames)}
        ref={tableWrapperRef}
      >
        {children}
      </div>
    </div>
  )
}

const Table = ({ data, filters }: { data: CeremoniesQuery; filters: CeremoniesSectionFilters }) => {
  const { t, i18n } = useTranslation()

  const theadRef = useRef<HTMLTableSectionElement>(null)
  useScrollToViewIfDataChange(data, filters, theadRef)

  const ceremonies = useMemo(() => {
    const ceremoniesData = data?.ceremonies?.data
    if (!ceremoniesData) {
      return undefined
    }
    if (ceremoniesData?.length === 0) {
      return []
    }

    const mappedCeremonies = ceremoniesData.map((ceremony) => {
      const cemeteryInfo = getCemeteryInfoFromCeremony(ceremony, i18n.language)

      const cemetery = cemeteryInfo?.slug ? (
        <CemeteryLink slug={cemeteryInfo.slug} title={cemeteryInfo.title ?? ''} />
      ) : (
        cemeteryInfo?.title
      )

      const dateTimeZoned = parseAbsolute(ceremony.attributes?.dateTime, bratislavaTimezone)
      const calendarDate = toCalendarDate(dateTimeZoned)

      return {
        ...ceremony.attributes,
        calendarDate,
        dateTime: dateTimeZoned.toDate(),
        cemetery,
        id: ceremony.id,
      }
    })

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
          <TableWrapper>
            {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
            <table className="m-table">
              <thead ref={theadRef}>
                <tr>
                  <th>{t('CeremoniesSection.th.time')}</th>
                  <th>{t('CeremoniesSection.th.name')}</th>
                  <th>{t('CeremoniesSection.th.birthYear')}</th>
                  <th>{t('CeremoniesSection.th.cemeteryTitle')}</th>
                  <th>{t('CeremoniesSection.th.type')}</th>
                  <th>{t('CeremoniesSection.th.company')}</th>
                  <th>{t('CeremoniesSection.th.officiantProvidedBy')}</th>
                </tr>
              </thead>
              <tbody>
                {list?.map((ceremony) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <tr key={ceremony.id}>
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
          </TableWrapper>
        </Fragment>
      ))}
      {ceremonies?.length === 0 && (
        <div className="mb-6 md:mb-10">
          <strong>{t('CeremoniesSection.noCeremonies')}</strong>
        </div>
      )}
      <p>
        <PrivateField /> {t('CeremoniesSection.privateFieldsDescription')}
      </p>
    </div>
  )
}

const DataWrapper = ({ filters }: { filters: CeremoniesSectionFilters }) => {
  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: getCeremoniesSectionQueryKey(filters),
    queryFn: () => ceremoniesSectionFetcher(filters),
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
    <LoadingOverlay loading={isFetching}>
      <Table data={data} filters={filters} />
    </LoadingOverlay>
  )
}

type CeremoniesSectionProps = {
  section: CeremoniesSectionFragment
}

const CeremoniesSection = ({ section }: CeremoniesSectionProps) => {
  const { t } = useTranslation()

  const [filters, setFilters] = useState<CeremoniesSectionFilters>(ceremoniesSectionDefaultFilters)

  const handleCemeteryChange = (cemeteryId: string | null) => {
    setFilters({ ...filters, cemeteryId })
  }

  return (
    <Section>
      <div className="mb-6 md:mb-8 md:w-[360px]">
        <CeremoniesDebtorsCemeterySelect
          label={t('CeremoniesSection.filterBy')}
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
