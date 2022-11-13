import { partnersSectionFetcher, partnersSectionSwrKey } from '@services/meili/fetchers'
import { isDefined, useGetSwrExtras } from '@utils'
import { useMemo } from 'react'
import useSWR from 'swr'

import Loading from '../atoms/Loading'
import PartnerCard from '../molecules/Cards/PartnerCard'
import Row from '../molecules/Row/Row'
import Section, { SectionProps } from '../molecules/Section'

type PartnersSectionProps = {
  featuredTitle: string | undefined | null
  otherTitle: string | undefined | null
}

const PartnersSection = ({
  featuredTitle,
  otherTitle,
  ...rest
}: Pick<SectionProps, 'background'> & PartnersSectionProps) => {
  const { data, error } = useSWR(partnersSectionSwrKey, partnersSectionFetcher)
  const { loadingAndNoDataToDisplay, dataToDisplay } = useGetSwrExtras({
    data,
    error,
  })

  const filteredPartners = useMemo(() => {
    return (
      dataToDisplay?.partners?.data
        ?.map((partner) => partner.attributes)
        .filter(isDefined)
        .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0)) ?? []
    )
  }, [dataToDisplay?.partners])

  const mainPartners = useMemo(() => {
    return filteredPartners.filter((partner) => !!partner.featured)
  }, [filteredPartners])

  const otherPartners = useMemo(() => {
    return filteredPartners.filter((partner) => !partner.featured)
  }, [filteredPartners])

  // TODO replace by proper loading and error
  if (loadingAndNoDataToDisplay) {
    return <Loading />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <Section {...rest}>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          {featuredTitle && <h2>{featuredTitle}</h2>}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {mainPartners.map((partner) => (
              <PartnerCard
                title={partner.title}
                linkHref={partner.link ?? '#'}
                image={partner.logo.data?.attributes}
                border
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {otherTitle && <h2>{otherTitle}</h2>}
          <div className="flex flex-col gap-3">
            {otherPartners.map((partner) => (
              <Row title={partner.title} linkHref={partner.link ?? '#'} border />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default PartnersSection
