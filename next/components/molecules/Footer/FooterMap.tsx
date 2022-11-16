import 'mapbox-gl/dist/mapbox-gl.css'

import { MapMarkerMarianumSvg } from '@assets'
import { Maybe } from '@graphql'
import { motion } from 'framer-motion'
import Map, { Marker } from 'react-map-gl'

export type FooterMapProps = {
  markerLat?: Maybe<string>
  markerLng?: Maybe<string>
  onMarkerClick: () => void
}

const FooterMap = ({ markerLat, markerLng, onMarkerClick }: FooterMapProps) => {
  return (
    <Map
      initialViewState={{
        longitude: parseFloat(markerLng ?? '0'),
        latitude: parseFloat(markerLat ?? '0'),
        zoom: 14,
      }}
      style={{ width: '100%', height: '100%' }}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      mapStyle={process.env.NEXT_PUBLIC_MAPBOX_DARK_STYLE}
      cooperativeGestures
    >
      <Marker
        anchor="bottom"
        latitude={parseFloat(markerLat ?? '0')}
        longitude={parseFloat(markerLng ?? '0')}
      >
        <motion.button
          onClick={onMarkerClick}
          style={{ originY: 1 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.8 }}
        >
          <MapMarkerMarianumSvg />
        </motion.button>
      </Marker>
    </Map>
  )
}

export default FooterMap
