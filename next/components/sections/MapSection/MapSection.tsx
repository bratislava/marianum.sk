import cx from 'classnames'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Map, { MapRef, Marker } from 'react-map-gl'
import slugify from 'slugify'
import useSWR from 'swr'

import MapMarkerIcon from '../../../assets/map-marker.svg'
import PlaceIcon from '../../../assets/place.svg'
import { Enum_Branch_Cemeterytype } from '../../../graphql'
import { client } from '../../../utils/gql'
import { isDefined } from '../../../utils/isDefined'
import Button from '../../atoms/Button'
import MLink from '../../atoms/MLink'
import TagToggle from '../../atoms/TagToggle'
import Search from '../../molecules/Search'
import Section, { SectionProps } from '../../molecules/Section'

const slugifyText = (text: string) => {
  return slugify(text, { replacement: ' ', lower: true })
}

// calculate bounding box for branches
const getBoundsForBranches = (
  branches: { longitude?: number | null; latitude?: number | null }[],
) => {
  const branchesLongitude = branches.map((branch) => branch.longitude).filter(isDefined) ?? []
  const branchesLatitude = branches.map((branch) => branch.latitude).filter(isDefined) ?? []

  return [
    [Math.min(...branchesLongitude), Math.min(...branchesLatitude)],
    [Math.max(...branchesLongitude), Math.max(...branchesLatitude)],
  ] as [[number, number], [number, number]]
}

type MapSectionProps = Pick<SectionProps, 'background' | 'title'>

const MapSection = ({ ...rest }: MapSectionProps) => {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'sections.MapSection' })

  const { data, error } = useSWR(['Cemeteries', i18n.language], (_key, locale) =>
    client.Cemeteries({ locale }),
  )

  const validBranches = useMemo(() => {
    return (data?.branches?.data
      ?.map((branch) => branch.attributes)
      .filter(isDefined)
      .filter(
        (branch) =>
          branch.address && branch.title && branch.slug && branch.latitude && branch.longitude,
      ) ?? []) as {
      address: string
      title: string
      slug: string
      latitude: number
      longitude: number
      cemeteryType: Enum_Branch_Cemeterytype
    }[]
  }, [data?.branches])

  const [searchQuery, setSearchQuery] = useState('')

  const slugifiedSearchQuery = useMemo(() => {
    return slugifyText(searchQuery)
  }, [searchQuery])

  const [hoveredBranchSlug, setHoveredBranchSlug] = useState<string | null>(null)

  const [isCivilChecked, setCivilChecked] = useState(false)
  const [isHistoricalChecked, setHistoricalChecked] = useState(false)
  const [isWarChecked, setWarChecked] = useState(false)

  const filteredBranches = useMemo(() => {
    return validBranches.filter(
      (branch) =>
        // search filter for address and title
        ((slugifyText(branch.address ?? '').includes(slugifiedSearchQuery) ||
          slugifyText(branch.title).includes(slugifiedSearchQuery)) &&
          // if no cemetery type selected, show all
          ((!isCivilChecked && !isHistoricalChecked && !isWarChecked) ||
            // otherwise
            // civil cemetery filter
            (isCivilChecked && branch.cemeteryType === Enum_Branch_Cemeterytype.Civilny) ||
            // historical cemetery filter
            (isHistoricalChecked && branch.cemeteryType === Enum_Branch_Cemeterytype.Historicky) ||
            // war cemetery filter
            (isWarChecked && branch.cemeteryType === Enum_Branch_Cemeterytype.Vojensky))) ??
        [],
    )
  }, [validBranches, slugifiedSearchQuery, isCivilChecked, isHistoricalChecked, isWarChecked])

  const mapRef = useRef<MapRef | null>(null)

  const fitBranches = useCallback(
    (duration = 0) => {
      try {
        // This code fails when there is no branches in the database.
        // For that reason there is a try-catch block. It's not clean but it's enough.
        mapRef.current?.fitBounds(getBoundsForBranches(filteredBranches), {
          padding: 100,
          offset: [0, 10],
          duration,
        })
      } catch {
        // When it fails, no one cares because there is no branches :)
      }
    },
    [filteredBranches],
  )

  useEffect(() => {
    fitBranches(500)
  }, [fitBranches, filteredBranches])

  const [isMapOrFiltersDisplayed, setMapOrFiltersDisplayed] = useState(false)

  // TODO replace by proper loading and error
  if (!data && !error) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <Section {...rest}>
      <div className="relative flex h-[624px] flex-col items-center overflow-hidden md:flex-row md:items-stretch">
        <div
          className={cx(
            'absolute z-20 flex h-full w-full flex-col bg-white transition-transform duration-500 md:relative md:w-[360px]',
            {
              '-translate-x-full md:translate-x-0': isMapOrFiltersDisplayed,
            },
          )}
        >
          {/* filtering */}
          <div className="flex flex-col gap-3 border-b border-border  p-5">
            <Search
              value={searchQuery}
              onSearchQueryChange={setSearchQuery}
              placeholder={t('search')}
            />
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
          <div className="flex-1 overflow-auto" onMouseLeave={() => setHoveredBranchSlug(null)}>
            {filteredBranches.map(({ title, address, slug }, index) => (
              <Fragment key={slug}>
                {index !== 0 && <hr className="mx-5 border-border" />}
                <MLink
                  onMouseEnter={() => setHoveredBranchSlug(slug)}
                  noStyles
                  href={`${t('paths.branches')}/${slug}`}
                  className={cx('flex gap-2 px-5 py-3', {
                    'bg-primary/5': slug === hoveredBranchSlug,
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
            ))}
            {filteredBranches.length === 0 && <div className="p-5">{t('noResults')}</div>}
          </div>
        </div>
        <div className="h-full w-full flex-1">
          <Map
            ref={mapRef}
            style={{ width: '100%', height: '100%' }}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            mapStyle={process.env.NEXT_PUBLIC_MAPBOX_LIGHT_STYLE}
            onLoad={() => fitBranches()}
            cooperativeGestures
          >
            {filteredBranches.map(({ latitude, longitude, slug }) =>
              latitude && longitude ? (
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
                    animate={{ scale: hoveredBranchSlug !== slug ? 0.75 : 1 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <MLink
                      onMouseEnter={() => setHoveredBranchSlug(slug)}
                      onMouseLeave={() => setHoveredBranchSlug(null)}
                      noStyles
                      href={`${t('paths.branches')}/${slug}`}
                    >
                      <MapMarkerIcon />
                    </MLink>
                  </motion.button>
                </Marker>
              ) : null,
            )}
          </Map>
        </div>
        {/* mobile bottom button */}
        <div className="absolute bottom-6 z-20 md:hidden">
          <Button
            className="rounded-full shadow"
            onPress={() => setMapOrFiltersDisplayed((m) => !m)}
            startIcon={<PlaceIcon />}
          >
            {isMapOrFiltersDisplayed ? t('filtering') : t('map')}
          </Button>
        </div>
      </div>
    </Section>
  )
}

export default MapSection
