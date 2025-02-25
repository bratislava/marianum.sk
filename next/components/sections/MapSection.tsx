import 'mapbox-gl/dist/mapbox-gl.css'

import cx from 'classnames'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import Map, { Marker } from 'react-map-gl'
import useSWR from 'swr'

import { MapMarkerSvg } from '@/assets'
import { ArrowLeftIcon, PlaceIcon } from '@/assets/icons'
import Button from '@/components/atoms/Button'
import Loading from '@/components/atoms/Loading'
import MLink from '@/components/atoms/MLink'
import TagToggle from '@/components/atoms/TagToggle'
import { useGetFullPath } from '@/components/molecules/Navigation/NavigationProvider/useGetFullPath'
import Search from '@/components/molecules/Search'
import Section from '@/components/molecules/Section'
import { Enum_Cemetery_Type, MapSectionFragment } from '@/graphql'
import { cemeteriesFetcher, getCemeteriesSwrKey } from '@/services/fetchers/cemeteriesFetcher'
import { useGetSwrExtras } from '@/utils/useGetSwrExtras'
import { useMapWithFilteringAndSearch } from '@/utils/useMapWithFilteringAndSearch'

type MapSectionProps = { section: MapSectionFragment }

const MapSection = ({ section }: MapSectionProps) => {
  const { t, i18n } = useTranslation(['common', 'general'])
  const { getFullPath } = useGetFullPath()

  const { data, error } = useSWR(
    getCemeteriesSwrKey(i18n.language),
    cemeteriesFetcher(i18n.language),
  )

  const { loadingAndNoDataToDisplay, dataToDisplay } = useGetSwrExtras({
    data,
    error,
  })

  const defaultFilters = {
    [Enum_Cemetery_Type.Civilny]: false,
    [Enum_Cemetery_Type.Historicky]: false,
    [Enum_Cemetery_Type.Vojensky]: false,
  }

  const {
    mapRef,
    initialBounds,
    searchQuery,
    setSearchQuery,
    selectedTypes,
    setSelectedTypes,
    hoveredLandmarkSlug: hoveredCemeterySlug,
    setHoveredLandmarkSlug: setHoveredCemeterySlug,
    isMapOrFiltersDisplayed,
    setMapOrFiltersDisplayed,
    filteredLandmarks: filteredCemeteries,
  } = useMapWithFilteringAndSearch(dataToDisplay?.cemeteries?.data, defaultFilters)

  // TODO replace by proper loading and error
  if (loadingAndNoDataToDisplay) {
    return <Loading />
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>
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
            <Search value={searchQuery} onSearchQueryChange={setSearchQuery} />
            <ul aria-label={t('MapSection.filtering')} className="flex gap-2">
              {Object.entries(selectedTypes).map(([type]) => {
                return (
                  <li key={type}>
                    <TagToggle
                      isSelected={selectedTypes[type]}
                      onChange={() =>
                        setSelectedTypes((prevState) => {
                          return {
                            ...prevState,
                            [type]: !prevState[type],
                          }
                        })
                      }
                    >
                      {t(`MapSection.filters.${type}`)}
                    </TagToggle>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Results */}
          <ul
            aria-label={t('general.results')}
            className="flex-1 overflow-auto"
            onMouseLeave={() => setHoveredCemeterySlug(null)}
          >
            {filteredCemeteries.map((cemetery, index) => {
              const { title, slug, address } = cemetery.attributes ?? {}

              return (
                <li key={slug}>
                  {index !== 0 && <hr className="mx-5 border-border" />}
                  <MLink
                    onMouseEnter={() => setHoveredCemeterySlug(slug ?? '')}
                    noStyles
                    href={getFullPath(cemetery) ?? ''}
                    className={cx('flex gap-2 px-5 py-3', {
                      'bg-primary/5': slug === hoveredCemeterySlug,
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
            {filteredCemeteries.length === 0 && (
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
            {filteredCemeteries.map((cemetery) => {
              const { latitude, longitude, slug } = cemetery.attributes ?? {}
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
                      animate={{ scale: hoveredCemeterySlug === slug ? 1 : 0.75 }}
                      whileTap={{ scale: 0.8 }}
                    >
                      <MLink
                        onMouseEnter={() => setHoveredCemeterySlug(slug ?? '')}
                        onMouseLeave={() => setHoveredCemeterySlug(null)}
                        noStyles
                        href={getFullPath(cemetery) ?? ''}
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

export default MapSection
