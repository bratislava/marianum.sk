import 'mapbox-gl/dist/mapbox-gl.css'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import Loading from '@/components/atoms/Loading'
import { useGetFullPath } from '@/components/molecules/Navigation/NavigationProvider/useGetFullPath'
import Section from '@/components/molecules/Section'
import MapWithSearch from '@/components/sections/MapWithSearch'
import { MapSectionFragment } from '@/graphql'
import {
  cemeteriesDefaultFilters,
  getMeiliCemeteriesQueryKey,
  meiliCemeteriesFetcher,
} from '@/services/fetchers/cemeteries/cemeteriesFetcher'
import { isDefined } from '@/utils/isDefined'

type MapSectionProps = { section: MapSectionFragment }

export const mapSectionDefaultFilters = {
  ...cemeteriesDefaultFilters,
  pageSize: 1000, // Get all results, -1 didn't work
}

const MapSection = ({ section }: MapSectionProps) => {
  const { getFullPath } = useGetFullPath()

  const categories = section.categories?.data.filter(isDefined) ?? []

  const defaultCategoryIds = categories.map((category) => category.id).filter(isDefined)

  const [filters, setFilters] = useState({
    ...mapSectionDefaultFilters,
    categoryIds: defaultCategoryIds,
  })

  const { data, isPending, isError, error } = useQuery({
    queryKey: getMeiliCemeteriesQueryKey(filters),
    queryFn: () => meiliCemeteriesFetcher(filters),
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
                ? defaultCategoryIds
                : defaultCategoryIds.filter((categoryId) => selection.has(categoryId)),
          }))
        }}
        landmarks={data.hits
          .map((hit) => {
            const { title, latitude, longitude, address } = hit ?? {}
            const linkHref = getFullPath({
              id: hit.id,
              __typename: 'CemeteryEntity',
              attributes: hit,
            })
            if (linkHref && latitude && longitude) {
              return {
                id: hit.id,
                title,
                longitude,
                latitude,
                linkHref,
                address: address ?? undefined,
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

export default MapSection
