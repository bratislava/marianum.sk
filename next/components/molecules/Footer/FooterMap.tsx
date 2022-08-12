import 'mapbox-gl/dist/mapbox-gl.css'

import { motion } from 'framer-motion'
import Map, { Marker } from 'react-map-gl'

import MapMarkerMarianum from '../../../assets/map-marker-marianum.svg'

export type FooterMapProps = {
  markerLat: number
  markerLng: number
  onMarkerClick: () => void
}

const FooterMap = ({ markerLat, markerLng, onMarkerClick }: FooterMapProps) => {
  return (
    <Map
      initialViewState={{
        longitude: markerLng,
        latitude: markerLat,
        zoom: 14,
      }}
      style={{ width: '100%', height: '100%' }}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      mapStyle={process.env.NEXT_PUBLIC_MAPBOX_DARK_STYLE}
    >
      <Marker anchor="bottom" latitude={markerLat} longitude={markerLng}>
        <motion.button
          onClick={onMarkerClick}
          style={{ originY: 1 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.8 }}
        >
          <MapMarkerMarianum />
        </motion.button>
      </Marker>
    </Map>
  )
}

export default FooterMap
