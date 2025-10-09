import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import Loading from '@/components/atoms/Loading'
import { useGetFullPath } from '@/components/molecules/Navigation/NavigationProvider/useGetFullPath'
import Section from '@/components/molecules/Section'
import MapWithSearch from '@/components/sections/MapWithSearch'
import { MapOfManagedObjectsSectionFragment } from '@/graphql'
import {
  getMeiliManagedObjectsQueryKey,
  managedObjectsDefaultFilters,
  meiliManagedObjectsFetcher,
} from '@/services/fetchers/managedObjectsFetcher'
import { isDefined } from '@/utils/isDefined'

type MapOfManagedObjectsSectionProps = {
  section: MapOfManagedObjectsSectionFragment
}

const MapOfManagedObjectsSection = ({ section }: MapOfManagedObjectsSectionProps) => {
  const { getFullPath } = useGetFullPath()

  const categories = section.categories?.data.filter(isDefined) ?? []

  const [filters, setFilters] = useState(managedObjectsDefaultFilters)

  const { data, isPending, isError, error } = useQuery({
    queryKey: getMeiliManagedObjectsQueryKey(filters),
    queryFn: () => meiliManagedObjectsFetcher(filters),
    placeholderData: keepPreviousData,
  })

  if (isPending) {
    return (
      <Section {...section}>
        <Loading />
      </Section>
    )
  }

  // TODO replace by proper error
  if (isError) {
    return (
      <Section {...section}>
        <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
      </Section>
    )
  }

  return (
    <Section {...section}>
      <MapWithSearch
        onSearchChange={(search) => {
          setFilters((prevState) => ({
            ...prevState,
            search,
          }))
        }}
        onSelectionChange={(selection) => {
          setFilters((prevState) => ({
            ...prevState,
            categoryIds:
              selection === 'all'
                ? []
                : categories
                    .filter((category) => category.id && selection.has(category.id))
                    .map((category) => category.id)
                    .filter(isDefined),
          }))
        }}
        landmarks={data.hits
          .map((hit) => {
            const { title, latitude, longitude } = hit ?? {}
            const linkHref = getFullPath({
              id: hit.id,
              attributes: hit,
              __typename: 'ManagedObjectEntity',
            })
            if (linkHref && latitude && longitude) {
              return {
                id: hit.id,
                title,
                longitude,
                latitude,
                linkHref,
              }
            }

            return null
          })
          .filter(isDefined)}
        tags={categories
          .map((category) => {
            const { title } = category.attributes ?? {}

            return category.id && title ? { id: category.id, title } : null
          })
          .filter(isDefined)}
      />
    </Section>
  )
}

export default MapOfManagedObjectsSection
