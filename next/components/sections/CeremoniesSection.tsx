import { parseAbsolute, parseDate, toCalendarDate } from '@internationalized/date'
import groupBy from 'lodash/groupBy'
import { useTranslation } from 'next-i18next'
import { Fragment, useMemo, useState } from 'react'
import useSwr from 'swr'

import { CeremoniesQuery, CeremoniesSectionFragment } from '../../graphql'
import { client } from '../../utils/gql'
import useGetSwrExtras from '../../utils/useGetSwrExtras'
import FormatDate from '../atoms/FormatDate'
import MLink from '../atoms/MLink'
import CeremoniesDebtorsBranchSelect from '../molecules/CeremoniesDebtors/BranchSelect'
import Section from '../molecules/Section'

type Filters = {
  branchId: string | null
}

const PrivateField = () => <span className="opacity-50">**</span>

const Table = ({ data }: { data: CeremoniesQuery }) => {
  const { t, i18n } = useTranslation('common', {
    keyPrefix: 'sections.CeremoniesSection',
  })

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
      // Ceremonies are not localized, and they return their Slovak relation as the main and the English version
      // as the first localization.
      const skBranchTitle = ceremony.attributes?.branch?.data?.attributes?.title
      const localeBranchTitle =
        ceremony.attributes?.branch?.data?.attributes?.localizations?.data?.find(
          (branch) => branch?.attributes?.locale === i18n.language,
        )?.attributes?.title

      const branchTitle = localeBranchTitle ?? skBranchTitle

      const dateTimeZoned = parseAbsolute(ceremony.attributes?.dateTime, 'Europe/Bratislava')
      const calendarDate = toCalendarDate(dateTimeZoned)

      return { ...ceremony.attributes, calendarDate, dateTime: dateTimeZoned.toDate(), branchTitle }
    })

    // eslint-disable-next-line lodash/prop-shorthand
    const groupedByDate = groupBy(mappedCeremonies, (ceremony) => ceremony.calendarDate)

    return Object.entries(groupedByDate).map(([date, list]) => ({
      date,
      list,
      parsedDate: parseDate(date).toDate('Europe/Bratislava'),
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
              <thead>
                <tr>
                  <th>{t('time')}</th>
                  <th>{t('name')}</th>
                  <th>{t('birthYear')}</th>
                  <th>{t('branchTitle')}</th>
                  <th>{t('type')}</th>
                  <th>{t('company')}</th>
                  <th>{t('officiantProvidedBy')}</th>
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
                    {/* TODO: Branch link */}
                    <td>{ceremony.branchTitle}</td>
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

const DataWrapper = ({ filters }: { filters: Filters }) => {
  const { data, error } = useSwr(['Ceremonies', filters], () => {
    const currentDate = parseAbsolute(new Date().toISOString(), 'Europe/Bratislava')
    const startOfDay = currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    const startOfDayString = startOfDay.toAbsoluteString()

    return client.Ceremonies({
      dateTime: startOfDayString,
      branchIdFilter: filters.branchId ? { eq: filters.branchId } : undefined,
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    <Table data={dataToDisplay!} />
  )
}

type CeremoniesSectionProps = {
  index: number
  section: CeremoniesSectionFragment
}

const CeremoniesSection = ({ index, section }: CeremoniesSectionProps) => {
  const { t } = useTranslation('common', {
    keyPrefix: 'sections.CeremoniesSection',
  })

  const [filters, setFilters] = useState<Filters>({
    branchId: null,
  })

  const handleBranchChange = (branchId: string) => {
    setFilters({ ...filters, branchId })
  }

  return (
    <Section index={index}>
      <div className="mb-6 md:mb-8 md:w-[360px]">
        <CeremoniesDebtorsBranchSelect
          label={t('filterBy')}
          type="ceremonies"
          onBranchChange={handleBranchChange}
        />
      </div>

      <div>
        <DataWrapper filters={filters} />
      </div>

      {section.archive && (
        <div className="mt-6 flex flex-col items-center gap-y-3 bg-white px-8 py-4 md:mt-16 md:flex-row md:justify-between md:px-12 md:py-10">
          <h4>{section.archive.title}</h4>
          {section.archive.button?.page?.data?.attributes?.slug && (
            <MLink href={section.archive.button.page.data.attributes.slug}>
              {section.archive.button?.label}
            </MLink>
          )}
        </div>
      )}
    </Section>
  )
}

export default CeremoniesSection
