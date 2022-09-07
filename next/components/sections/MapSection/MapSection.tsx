import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { Fragment, useMemo, useState } from 'react'
import Map, { Marker } from 'react-map-gl'
import slugify from 'slugify'
import useSWR from 'swr'

import MapMarkerIcon from '../../../assets/map-marker.svg'
import PlaceIcon from '../../../assets/place.svg'
import { client } from '../../../utils/gql'
import { isDefined } from '../../../utils/isDefined'
import MLink from '../../atoms/MLink'
import TagToggle from '../../atoms/TagToggle'
import Search from '../../molecules/Search'
import Section, { SectionProps } from '../../molecules/Section'

type MapSectionProps = Pick<SectionProps, 'isContainer' | 'color' | 'title'>

const MapSection = ({ ...rest }: MapSectionProps) => {
  const { i18n } = useTranslation()

  const { data, error } = useSWR(['Branches', i18n.language], (_key, locale) =>
    client.Branches({ locale }),
  )

  const validBranches = useMemo(() => {
    return (
      data?.branches?.data
        ?.map((branch) => branch.attributes)
        .filter(isDefined)
        .filter(
          (branch) => branch.address && branch.title && branch.latitude && branch.longitude,
        ) ?? []
    )
  }, [data?.branches])

  const [searchQuery, setSearchQuery] = useState('')

  const slugifiedSearchQuery = useMemo(() => {
    return slugify(searchQuery, { replacement: ' ', lower: true })
  }, [searchQuery])

  const filteredBranches = useMemo(() => {
    return validBranches.filter(
      (branch) =>
        (slugify(branch.address ?? '', { replacement: ' ', lower: true }).includes(
          slugifiedSearchQuery,
        ) ||
          slugify(branch.title, { replacement: ' ', lower: true }).includes(
            slugifiedSearchQuery,
          )) ??
        [],
    )
  }, [validBranches, slugifiedSearchQuery])

  // TODO replace by proper loading and error
  if (!data && !error) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <Section {...rest}>
      <div className="flex h-[624px]">
        <div className="h-full w-[360px] bg-white">
          <div className="flex flex-col gap-3 border-b border-border p-5">
            <Search
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search..."
              // eslint-disable-next-line no-alert
              onSearch={(value) => alert(`Searching for: ${value}`)}
            />
            <div className="flex gap-2">
              <TagToggle>Civilné</TagToggle>
              <TagToggle>Historické</TagToggle>
              <TagToggle>Vojnové</TagToggle>
            </div>
          </div>
          <div className="py-1">
            {filteredBranches.map(({ title, address, slug }, index) => (
              <Fragment key={slug}>
                {index !== 0 && <hr className="mx-5 border-border" />}
                {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
                <MLink noStyles href={`/branches/${slug}`} className="flex gap-2 px-5 py-3">
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
          </div>
        </div>
        <div className="h-full w-full flex-1">
          <Map
            // initialViewState={{
            //   longitude: parseFloat(markerLng ?? '0'),
            //   latitude: parseFloat(markerLat ?? '0'),
            //   zoom: 14,
            // }}
            style={{ width: '100%', height: '100%' }}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            mapStyle={process.env.NEXT_PUBLIC_MAPBOX_LIGHT_STYLE}
          >
            {filteredBranches.map(({ latitude, longitude }) =>
              latitude && longitude ? (
                <Marker
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  key={`${latitude}${longitude}`}
                  anchor="bottom"
                  latitude={latitude}
                  longitude={longitude}
                >
                  <motion.button
                    //   onClick={onMarkerClick}
                    style={{ originY: 1 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <MapMarkerIcon />
                  </motion.button>
                </Marker>
              ) : null,
            )}
          </Map>
        </div>
      </div>
    </Section>
  )
}

export default MapSection
