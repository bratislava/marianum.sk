import { isSameDay, parseAbsolute } from '@internationalized/date'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import useSWR from 'swr'

import { UpcomingCeremoniesSectionFragment } from '../../graphql'
import { bratislavaTimezone } from '../../utils/consts'
import { client } from '../../utils/gql'
import FormatDate from '../atoms/FormatDate'
import MLink from '../atoms/MLink'
import Section from '../molecules/Section'

const HomepageCeremoniesListingTable = () => {
  const { t, i18n } = useTranslation()

  const { data, error } = useSWR(['HomepageCeremonies'], () => {
    const dateTime = new Date()
    // I think we also want to display ongoing ceremonies, 2 hours seems like a reasonable time.
    dateTime.setHours(dateTime.getHours() - 2)

    return client.HomepageCeremonies({ dateTime })
  })

  const ceremonies = useMemo(() => {
    const ceremoniesData = data?.ceremonies?.data
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
        // Ceremonies are not localized, and they return their Slovak relation as the main and the English version
        // as the first localization.
        const skBranchName = ceremony.attributes?.branch?.data?.attributes?.title

        return {
          name: ceremony.attributes?.name,
          branchName:
            i18n.language === 'en'
              ? ceremony.attributes?.branch?.data?.attributes?.localizations?.data[0]?.attributes
                  ?.title ?? skBranchName
              : skBranchName,
          time: new Date(ceremony.attributes?.dateTime),
        }
      }),
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.ceremonies])

  // TODO replace by proper loading and error
  if (!data && !error) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  }

  if (ceremonies?.ceremonies.length === 0) {
    return (
      <div>
        <strong>{t('sections.CeremoniesSection.noCeremonies')}</strong>
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
            {/* TODO: Branch link */}
            <td className="py-4 group-last:pb-0">{ceremony.branchName}</td>
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
  index: number
}

const HomepageCeremoniesListing = ({ section, index }: CeremoniesListingProps) => {
  const showMoreButtonSlug = section.showMoreButton?.page?.data?.attributes?.slug
  const showMoreButton = section.showMoreButton && showMoreButtonSlug && (
    <MLink href={showMoreButtonSlug}>{section.showMoreButton.label}</MLink>
  )

  return (
    <Section index={index}>
      <div className="grid gap-x-6 gap-y-8 md:grid-cols-1 lg:grid-cols-2">
        <div>
          <h2 className="lg:mb-6">{section.title}</h2>
          <div className="hidden lg:block">{showMoreButton}</div>
        </div>
        <div>
          <HomepageCeremoniesListingTable />
        </div>
        <div className="text-center lg:hidden">{showMoreButton}</div>
      </div>
    </Section>
  )
}

export default HomepageCeremoniesListing
