import { isSameDay, parseAbsolute } from '@internationalized/date'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import useSWR from 'swr'

import { UpcomingCeremoniesSectionFragment } from '../../graphql'
import { bratislavaTimezone } from '../../utils/consts'
import {
  upcomingCeremoniesFetcher,
  upcomingCeremoniesSwrKey,
} from '../../utils/fetchers/upcomingCeremoniesFetcher'
import { getBranchInfoInCeremoniesDebtors } from '../../utils/getBranchInfoInCeremoniesDebtors'
import useGetSwrExtras from '../../utils/useGetSwrExtras'
import FormatDate from '../atoms/FormatDate'
import Loading from '../atoms/Loading'
import MLink from '../atoms/MLink'
import BranchLink from '../molecules/BranchLink'
import { useSlug } from '../molecules/Navigation/NavigationProvider/useFullSlug'
import Section from '../molecules/Section'

const Table = () => {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'CeremoniesSection' })

  const { data, error } = useSWR(upcomingCeremoniesSwrKey, upcomingCeremoniesFetcher)

  const { loadingAndNoDataToDisplay, dataToDisplay } = useGetSwrExtras({
    data,
    error,
  })

  const ceremonies = useMemo(() => {
    const ceremoniesData = dataToDisplay?.ceremonies?.data
    if (!ceremoniesData) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      return undefined
    }
    if (ceremoniesData?.length === 0) {
      return { ceremonies: [] }
    }
    // The API returns first 5 ceremonies, but we want to display ceremonies only of the same date. Therefore, we get the
    // date of the first ceremony and filter only those taking place on the same date.
    const firstCeremonyDayDateTimeZoned = parseAbsolute(
      ceremoniesData[0]?.attributes?.dateTime,
      bratislavaTimezone,
    )

    const filteredCeremonies = ceremoniesData.filter((ceremony) =>
      isSameDay(
        parseAbsolute(ceremony.attributes?.dateTime, bratislavaTimezone),
        firstCeremonyDayDateTimeZoned,
      ),
    )

    return {
      day: firstCeremonyDayDateTimeZoned.toDate(),
      ceremonies: filteredCeremonies.map((ceremony) => {
        const branchInfo = ceremony?.attributes?.branch?.data
          ? getBranchInfoInCeremoniesDebtors(ceremony.attributes.branch.data, i18n.language)
          : null

        const branch = branchInfo?.slug ? (
          <BranchLink slug={branchInfo?.slug} title={branchInfo?.title ?? ''} />
        ) : (
          branchInfo?.title
        )

        return {
          name: ceremony.attributes?.name,
          branch,
          time: new Date(ceremony.attributes?.dateTime),
        }
      }),
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataToDisplay?.ceremonies])

  // TODO replace by proper loading and error
  if (loadingAndNoDataToDisplay) {
    return <Loading />
  }

  if (error) {
    return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  }

  if (ceremonies?.ceremonies.length === 0) {
    return (
      <div>
        <strong>{t('noCeremonies')}</strong>
      </div>
    )
  }

  return (
    <table className="w-full overflow-x-auto">
      <thead>
        <tr>
          <th colSpan={3} className="pb-4 text-left">
            {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
            <FormatDate value={ceremonies!.day!} format="homepageCeremoniesDate" />
          </th>
        </tr>
      </thead>
      <tbody>
        {ceremonies?.ceremonies.map((ceremony, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <tr className="group border-t border-border first:border-t-0" key={index}>
            <td className="py-4 group-last:pb-0">{ceremony.name}</td>
            <td className="py-4 group-last:pb-0">{ceremony.branch}</td>
            <td className="py-4 group-last:pb-0">
              <FormatDate value={ceremony.time} format="ceremoniesTime" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

type CeremoniesListingProps = {
  section: UpcomingCeremoniesSectionFragment
}

const UpcomingCeremoniesSection = ({ section }: CeremoniesListingProps) => {
  const { getFullSlug } = useSlug()

  const showMoreButtonSlug = getFullSlug(section.showMoreButton?.page?.data)

  const showMoreButton = section.showMoreButton && showMoreButtonSlug && (
    <MLink href={showMoreButtonSlug}>{section.showMoreButton.label}</MLink>
  )

  return (
    <Section>
      <div className="grid gap-x-6 gap-y-8 md:grid-cols-1 lg:grid-cols-2">
        <div>
          <h2 className="lg:mb-6">{section.title}</h2>
          <div className="hidden lg:block">{showMoreButton}</div>
        </div>
        <div>
          <Table />
        </div>
        <div className="text-center lg:hidden">{showMoreButton}</div>
      </div>
    </Section>
  )
}

export default UpcomingCeremoniesSection
