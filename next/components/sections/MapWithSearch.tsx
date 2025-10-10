import cx from 'classnames'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import { Selection, Tag, TagGroup, TagList } from 'react-aria-components'
import Map, { Marker } from 'react-map-gl'
import { useDebounceValue } from 'usehooks-ts'

import { MapMarkerSvg } from '@/assets'
import { ArrowLeftIcon, PlaceIcon } from '@/assets/icons'
import Button from '@/components/atoms/Button'
import MLink from '@/components/atoms/MLink'
import Search from '@/components/molecules/Search'
import { useFitLandmarks } from '@/utils/useFitLandmarks'

type Props = {
  landmarks: {
    id: string
    longitude: number
    latitude: number
    title: string
    linkHref: string
    address?: string
  }[]
  tags?: {
    id: string
    title: string
  }[]
  onSearchChange?: (searchQuery: string) => void
  onSelectionChange?: (selection: Selection) => void
}

const MapWithSearch = ({ landmarks, tags, onSearchChange, onSelectionChange }: Props) => {
  const { t } = useTranslation()

  const [isMapOrFiltersDisplayed, setMapOrFiltersDisplayed] = useState(false)
  const [hoveredLandmarkId, setHoveredLandmarkId] = useState<string | null>(null)

  const [selection, setSelection] = useState<Selection>(new Set([]))

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [debouncedSearchQuery] = useDebounceValue(searchQuery, 300)

  const { mapRef, initialBounds } = useFitLandmarks(landmarks)

  useEffect(() => {
    onSearchChange?.(debouncedSearchQuery)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery])

  useEffect(() => {
    // When no tags are selected, act as all of them are selected.
    onSelectionChange?.(selection !== 'all' && selection.size === 0 ? 'all' : selection)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection])

  return (
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
          <Search value={debouncedSearchQuery} onSearchQueryChange={setSearchQuery} />
          {tags?.length ? (
            <TagGroup
              aria-label={t('MapSection.filtering')}
              selectionMode="multiple"
              onSelectionChange={setSelection}
              selectedKeys={selection}
            >
              <TagList className="flex gap-2">
                {tags.map((tag) => {
                  return (
                    <Tag
                      key={tag.id}
                      id={tag.id}
                      className={cx(
                        'base-focus-ring flex h-8 w-fit cursor-pointer select-none items-center whitespace-nowrap rounded-full border px-3 text-sm font-semibold',
                        'border-border bg-white hover:bg-background-beige',
                        'data-[selected]:border-primary data-[selected]:bg-primary data-[selected]:text-white data-[selected]:hover:bg-primary-dark',
                      )}
                    >
                      {tag.title}
                    </Tag>
                  )
                })}
              </TagList>
            </TagGroup>
          ) : null}
        </div>

        {/* Results */}
        <ul
          aria-label={t('MapSection.results')}
          className="flex-1 overflow-auto"
          // tabIndex={-1} // We are setting internal state on onMouseLeave, so the list itself does not need keyboard focus
          onMouseLeave={() => setHoveredLandmarkId(null)}
        >
          {landmarks.map((landmark, index) => {
            const { title, linkHref, address, id } = landmark

            return (
              <li key={linkHref}>
                {index !== 0 && <hr className="mx-5 border-border" />}
                <MLink
                  onMouseEnter={() => setHoveredLandmarkId(id)}
                  noStyles
                  href={linkHref} // getFullPath(landmark) ?? ''}
                  className={cx('flex gap-2 px-5 py-3 ring-inset ring-offset-0', {
                    'bg-primary/5': id === hoveredLandmarkId,
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
          {landmarks.length === 0 && <div className="p-5">{t('MapSection.noResults')}</div>}
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
          {landmarks.map((landmark) => {
            const { latitude, longitude, linkHref, id } = landmark

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
                    animate={{ scale: id === hoveredLandmarkId ? 1 : 0.75 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <MLink
                      onMouseEnter={() => setHoveredLandmarkId(id)}
                      onMouseLeave={() => setHoveredLandmarkId(null)}
                      noStyles
                      href={linkHref}
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
  )
}

export default MapWithSearch
