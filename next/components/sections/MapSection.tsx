import { MapMarkerSvg } from '@assets'
import { ArrowLeftIcon, PlaceIcon } from '@assets/icons'
import Button from '@components/atoms/Button'
import Loading from '@components/atoms/Loading'
import MLink from '@components/atoms/MLink'
import TagToggle from '@components/atoms/TagToggle'
import { useGetFullPath } from '@components/molecules/Navigation/NavigationProvider/useGetFullPath'
import Search from '@components/molecules/Search'
import Section from '@components/molecules/Section'
import { CemeteryEntityFragment, Enum_Cemetery_Type, MapSectionFragment } from '@graphql'
import { cemeteriesFetcher, getCemeteriesSwrKey } from '@services/fetchers/cemeteriesFetcher'
import { isDefined } from '@utils/isDefined'
import { useGetSwrExtras } from '@utils/useGetSwrExtras'
import cx from 'classnames'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Map, { MapRef, Marker } from 'react-map-gl'
import slugify from 'slugify'
import useSWR from 'swr'

const slugifyText = (text: string) => {
  return slugify(text, { replacement: ' ', lower: true })
}

// calculate bounding box for cemeteries
const getBoundsForCemeteries = (cemeteries: CemeteryEntityFragment[]) => {
  const cemeteriesLongitude =
    cemeteries.map((cemetery) => cemetery.attributes?.longitude).filter(isDefined) ?? []
  const cemeteriesLatitude =
    cemeteries.map((cemetery) => cemetery.attributes?.latitude).filter(isDefined) ?? []

  return [
    [Math.min(...cemeteriesLongitude), Math.min(...cemeteriesLatitude)],
    [Math.max(...cemeteriesLongitude), Math.max(...cemeteriesLatitude)],
  ] as [[number, number], [number, number]]
}

type MapSectionProps = { section: MapSectionFragment }

const MapSection = ({ section }: MapSectionProps) => {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'MapSection' })

  const { getFullPath } = useGetFullPath()

  const { data, error } = useSWR(
    getCemeteriesSwrKey(i18n.language),
    cemeteriesFetcher(i18n.language),
  )

  const { loadingAndNoDataToDisplay, dataToDisplay } = useGetSwrExtras({
    data,
    error,
  })

  const validCemeteries = useMemo(() => {
    return (
      dataToDisplay?.cemeteries?.data
        ?.map((cemetery) => {
          const { address, title, slug, latitude, longitude } = cemetery.attributes ?? {}
          if (address && title && slug && latitude && longitude) {
            return cemetery
          }
          return null
        })
        .filter(isDefined) ?? []
    )
  }, [dataToDisplay?.cemeteries])

  const [searchQuery, setSearchQuery] = useState('')

  const slugifiedSearchQuery = useMemo(() => {
    return slugifyText(searchQuery)
  }, [searchQuery])

  const [hoveredCemeterySlug, setHoveredCemeterySlug] = useState<string | null>(null)

  const [isCivilChecked, setCivilChecked] = useState(false)
  const [isHistoricalChecked, setHistoricalChecked] = useState(false)
  const [isWarChecked, setWarChecked] = useState(false)

  const filteredCemeteries = useMemo(() => {
    return validCemeteries.filter(
      (cemetery) =>
        // search filter for address and title
        ((slugifyText(cemetery.attributes?.address ?? '').includes(slugifiedSearchQuery) ||
          slugifyText(cemetery.attributes?.title ?? '').includes(slugifiedSearchQuery)) &&
          // if no cemetery type selected, show all
          ((!isCivilChecked && !isHistoricalChecked && !isWarChecked) ||
            // otherwise
            // civil cemetery filter
            (isCivilChecked && cemetery.attributes?.type === Enum_Cemetery_Type.Civilny) ||
            // historical cemetery filter
            (isHistoricalChecked && cemetery.attributes?.type === Enum_Cemetery_Type.Historicky) ||
            // war cemetery filter
            (isWarChecked && cemetery.attributes?.type === Enum_Cemetery_Type.Vojensky))) ??
        [],
    )
  }, [validCemeteries, slugifiedSearchQuery, isCivilChecked, isHistoricalChecked, isWarChecked])

  const mapRef = useRef<MapRef | null>(null)
  const initialBounds = useRef(filteredCemeteries && getBoundsForCemeteries(filteredCemeteries))

  const fitCemeteries = useCallback(
    (duration = 0) => {
      try {
        // This code fails when there is no cemeteries in the database.
        // For that reason there is a try-catch block. It's not clean but it's enough.
        mapRef.current?.fitBounds(getBoundsForCemeteries(filteredCemeteries), {
          padding: 100,
          offset: [0, 10],
          duration,
        })
      } catch {
        // When it fails, no one cares because there is no cemeteries :)
      }
    },
    [filteredCemeteries],
  )

  useEffect(() => {
    fitCemeteries(500)
  }, [fitCemeteries, filteredCemeteries])

  const [isMapOrFiltersDisplayed, setMapOrFiltersDisplayed] = useState(false)

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
          {/* filtering */}
          <div className="flex flex-col gap-3 border-b border-border p-5">
            <Search value={searchQuery} onSearchQueryChange={setSearchQuery} />
            <div className="flex gap-2">
              <TagToggle isSelected={isCivilChecked} onChange={setCivilChecked}>
                {t('filters.civil')}
              </TagToggle>
              <TagToggle isSelected={isHistoricalChecked} onChange={setHistoricalChecked}>
                {t('filters.historical')}
              </TagToggle>
              <TagToggle isSelected={isWarChecked} onChange={setWarChecked}>
                {t('filters.war')}
              </TagToggle>
            </div>
          </div>
          {/* results */}
          <div className="flex-1 overflow-auto" onMouseLeave={() => setHoveredCemeterySlug(null)}>
            {filteredCemeteries.map((cemetery, index) => {
              const { title, slug, address } = cemetery.attributes ?? {}

              return (
                <Fragment key={slug}>
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
                </Fragment>
              )
            })}
            {filteredCemeteries.length === 0 && <div className="p-5">{t('noResults')}</div>}
          </div>
        </div>
        <div className="h-full w-full flex-1">
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
        {/* mobile bottom button */}
        <div className="absolute bottom-6 z-[2] md:hidden">
          <Button
            className="rounded-full shadow"
            onPress={() => setMapOrFiltersDisplayed((m) => !m)}
            startIcon={isMapOrFiltersDisplayed ? <ArrowLeftIcon /> : <PlaceIcon />}
          >
            {isMapOrFiltersDisplayed ? t('filtering') : t('map')}
          </Button>
        </div>
      </div>
    </Section>
  )
}

export default MapSection
