import { keepPreviousData, useQuery } from '@tanstack/react-query'
import cx from 'classnames'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useCallback, useEffect, useState } from 'react'
import Map, { Marker } from 'react-map-gl'
import { useDebounceValue } from 'usehooks-ts'

import { MapMarkerSvg } from '@/assets'
import { ArrowLeftIcon, PlaceIcon } from '@/assets/icons'
import Button from '@/components/atoms/Button'
import Loading from '@/components/atoms/Loading'
import MLink from '@/components/atoms/MLink'
import TagToggle from '@/components/atoms/TagToggle'
import FilteringSearchInput from '@/components/molecules/FilteringSearchInput'
import MapObjectsCategoryTags from '@/components/molecules/MapObjectsCategoryTags'
import { useGetFullPath } from '@/components/molecules/Navigation/NavigationProvider/useGetFullPath'
import Search from '@/components/molecules/Search'
import Section from '@/components/molecules/Section'
import { Enum_Managedobject_Type, MapOfManagedObjectsSectionFragment } from '@/graphql'
import {
  getGraphqlManagedObjectsQueryKey,
  graphqlManagedObjectsFetcher,
  managedObjectsDefaultFilters,
  ManagedObjectsFilters,
} from '@/services/fetchers/managedObjectsFetcher'
import { client } from '@/services/graphql/gqlClient'
import { useMapWithFilteringAndSearch } from '@/utils/useMapWithFilteringAndSearch'

type MapOfManagedObjectsSectionProps = {
  section: MapOfManagedObjectsSectionFragment
}

const mappedFetcher = () =>
  client.ManagedObjectCategories().then(
    (data) =>
      data.managedObjectCategories?.data
        .filter((category) => category.attributes)
        .map((category) => ({
          title: category.attributes?.title ?? '',
          slug: category.attributes?.slug ?? '',
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          key: category.id!,
        })) ?? [],
  )

const MapOfManagedObjectsSection = ({ section }: MapOfManagedObjectsSectionProps) => {
  const { t, i18n } = useTranslation()
  const locale = i18n.language

  const { getFullPath } = useGetFullPath()

  const [filters, setFilters] = useState<ManagedObjectsFilters>(managedObjectsDefaultFilters)
  const [searchInputValue, setSearchInputValue] = useState<string>('')
  const [debouncedSearchInputValue] = useDebounceValue<string>(searchInputValue, 300)
  const [selectedCategories, setSelectedCategory] = useState<Record<string, boolean>>({})

  // const handleCategoryChange = (categoryId: string | null) => {
  //   setFilters({ ...filters, page: 1, categoryId })
  // }

  useEffect(() => {
    if (filters.search !== debouncedSearchInputValue) {
      setFilters({ ...filters, search: debouncedSearchInputValue, page: 1 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchInputValue])

  const toggleSelectedCategory = useCallback((selectedCategory: string) => {
    setSelectedCategory((prevState) => {
      return {
        ...prevState,
        [selectedCategory]: !prevState[selectedCategory],
      }
    })
  }, [])

  /// //-------------
  const translationMap: Record<string, string> = {
    [Enum_Managedobject_Type.Fontana]: t('MapSection.managedObjectsFilter.fontana'),
    [Enum_Managedobject_Type.PitnaFontana]: t('MapSection.managedObjectsFilter.pitnaFontana'),
    [Enum_Managedobject_Type.HmlovaFontana]: t('MapSection.managedObjectsFilter.hmlovaFontana'),
    [Enum_Managedobject_Type.Studna]: t('MapSection.managedObjectsFilter.studna'),
    [Enum_Managedobject_Type.Rozprasovac]: t('MapSection.managedObjectsFilter.rozprasovac'),
  } satisfies Record<Enum_Managedobject_Type, string>

  const { data, isPending, isError, error } = useQuery({
    queryKey: getGraphqlManagedObjectsQueryKey(locale),
    queryFn: () => graphqlManagedObjectsFetcher(locale),
    placeholderData: keepPreviousData,
  })

  const defaultFilters = {
    [Enum_Managedobject_Type.Fontana]: false,
    [Enum_Managedobject_Type.PitnaFontana]: false,
    [Enum_Managedobject_Type.HmlovaFontana]: false,
    [Enum_Managedobject_Type.Studna]: false,
    [Enum_Managedobject_Type.Rozprasovac]: false,
  }

  const {
    mapRef,
    initialBounds,
    searchQuery,
    setSearchQuery,
    selectedTypes,
    toggleSelectedTypes,
    hoveredLandmarkSlug: hoveredManagedObjectSlug,
    setHoveredLandmarkSlug: setHoveredManagedObjectSlug,
    isMapOrFiltersDisplayed,
    setMapOrFiltersDisplayed,
    filteredLandmarks: filteredManagedObjects,
  } = useMapWithFilteringAndSearch(data?.managedObjects?.data, defaultFilters)

  if (isPending) {
    return (
      <div className="py-6">
        <Loading />
      </div>
    )
  }

  // TODO replace by proper error
  if (isError) {
    return <div className="whitespace-pre py-6">Error: {JSON.stringify(error, null, 2)}</div>
  }

  return (
    <Section {...section}>
      <div className="relative flex h-[624px] flex-col items-center overflow-hidden md:flex-row md:items-stretch">
        <div
          className={cx(
            'absolute z-[2] flex h-full w-full flex-col bg-white transition-transform duration-500 md:relative md:w-[360px]',
            {
              '-translate-x-full md:translate-x-0': isMapOrFiltersDisplayed,
            },
          )}
        >
          {/* Search & filtering */}
          <div className="flex flex-col gap-3 border-b border-border p-5">
            <FilteringSearchInput
              value={searchInputValue}
              onChange={(value) => setSearchInputValue(value)}
            />
            <Search value={searchQuery} onSearchQueryChange={setSearchQuery} />
            <MapObjectsCategoryTags
              toggleSelectedCategory={toggleSelectedCategory}
              selectedCategories={selectedCategories}
              queryKey={['ManagedObjectCategories']}
              fetcher={mappedFetcher}
            />
            <ul aria-label={t('MapSection.filtering')} className="flex flex-wrap gap-2">
              {Object.entries(selectedTypes).map(([type]) => {
                return (
                  <li key={type}>
                    <TagToggle
                      isSelected={selectedTypes[type]}
                      onChange={() => toggleSelectedTypes(type)}
                    >
                      {translationMap[type]}
                    </TagToggle>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Results */}
          <ul
            aria-label={t('MapSection.results')}
            className="flex-1 overflow-auto"
            tabIndex={-1} // We are setting internal state on onMouseLeave, so the list itself does not need keyboard focus
            onMouseLeave={() => setHoveredManagedObjectSlug(null)}
          >
            {filteredManagedObjects.map((managedObject, index) => {
              const { title, slug, address } = managedObject.attributes ?? {}

              return (
                <li key={slug}>
                  {index !== 0 && <hr className="mx-5 border-border" />}
                  <MLink
                    onMouseEnter={() => setHoveredManagedObjectSlug(slug ?? '')}
                    noStyles
                    href={getFullPath(managedObject) ?? ''}
                    className={cx('flex gap-2 px-5 py-3 ring-inset ring-offset-0', {
                      'bg-primary/5': slug === hoveredManagedObjectSlug,
                    })}
                  >
                    <div className="pt-[2px] text-primary">
                      <PlaceIcon />
                    </div>
                    <div className="flex flex-col">
                      <div className="font-semibold text-primary">{title}</div>
                      <div className="text-sm">{address}</div>
                    </div>
                  </MLink>
                </li>
              )
            })}
            {filteredManagedObjects.length === 0 && (
              <div className="p-5">{t('MapSection.noResults')}</div>
            )}
          </ul>
        </div>

        <div className="size-full flex-1">
          <Map
            ref={mapRef}
            style={{ width: '100%', height: '100%' }}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            mapStyle={process.env.NEXT_PUBLIC_MAPBOX_LIGHT_STYLE}
            initialViewState={{
              bounds: initialBounds.current,
              fitBoundsOptions: {
                padding: 100,
                offset: [0, 10],
              },
            }}
            cooperativeGestures
          >
            {filteredManagedObjects.map((managedObject) => {
              const { latitude, longitude, slug } = managedObject.attributes ?? {}
              if (latitude && longitude) {
                return (
                  <Marker
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    key={`${latitude}${longitude}`}
                    anchor="bottom"
                    latitude={latitude}
                    longitude={longitude}
                  >
                    <motion.button
                      style={{ originY: 1 }}
                      initial={{ scale: 0 }}
                      animate={{ scale: hoveredManagedObjectSlug === slug ? 1 : 0.75 }}
                      whileTap={{ scale: 0.8 }}
                    >
                      <MLink
                        onMouseEnter={() => setHoveredManagedObjectSlug(slug ?? '')}
                        onMouseLeave={() => setHoveredManagedObjectSlug(null)}
                        noStyles
                        href={getFullPath(managedObject) ?? ''}
                      >
                        <MapMarkerSvg />
                      </MLink>
                    </motion.button>
                  </Marker>
                )
              }

              return null
            })}
          </Map>
        </div>

        {/* Mobile view */}
        <div className="absolute bottom-6 z-[2] md:hidden">
          <Button
            className="rounded-full shadow"
            onPress={() => setMapOrFiltersDisplayed((map) => !map)}
            startIcon={isMapOrFiltersDisplayed ? <ArrowLeftIcon /> : <PlaceIcon />}
          >
            {isMapOrFiltersDisplayed ? t('MapSection.filtering') : t('MapSection.map')}
          </Button>
        </div>
      </div>
    </Section>
  )
}

export default MapOfManagedObjectsSection
