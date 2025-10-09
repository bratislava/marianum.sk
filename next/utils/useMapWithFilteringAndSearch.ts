import { useCallback, useEffect, useRef } from 'react'
import { MapRef } from 'react-map-gl'

type Landmark = {
  latitude: number
  longitude: number
}

const getBoundsForLandmarks = (landmarks: Landmark[]) => {
  const longitudes = landmarks.map((landmark) => landmark.longitude)
  const latitudes = landmarks.map((landmark) => landmark.latitude)

  return [
    [Math.min(...longitudes), Math.min(...latitudes)],
    [Math.max(...longitudes), Math.max(...latitudes)],
  ] as [[number, number], [number, number]]
}

export const useMapWithFilteringAndSearch = (landmarks: Landmark[]) => {
  // const [hoveredLandmarkSlug, setHoveredLandmarkSlug] = useState<string | null>(null)

  // const [isMapOrFiltersDisplayed, setMapOrFiltersDisplayed] = useState(false)

  // const toggleSelectedTypes = useCallback((selectedType: string) => {
  //   setSelectedTypes((prevState) => {
  //     return {
  //       ...prevState,
  //       [selectedType]: !prevState[selectedType],
  //     }
  //   })
  // }, [])

  // const validLandmarks = useMemo(() => {
  //   return (
  //     landmarks
  //       ?.map((landmark) => {
  //         const { address, title, slug, latitude, longitude } = landmark.attributes ?? {}
  //         if (address && title && slug && latitude && longitude) {
  //           return landmark
  //         }
  //
  //         return null
  //       })
  //       .filter(isDefined) ?? []
  //   )
  // }, [landmarks])

  // const filteredLandmarks = useMemo(() => {
  //   // Otherwise, apply both search and type filters
  //   return validLandmarks.filter((landmark) =>
  //     Object.entries(selectedTypes).some(
  //       ([type, isSelected]) => landmark.attributes?.type === type && isSelected,
  //     ),
  //   )
  // }, [validLandmarks, selectedTypes])

  const mapRef = useRef<MapRef | null>(null)
  const initialBounds = useRef(landmarks && getBoundsForLandmarks(landmarks))

  const fitLandmarks = useCallback(
    (duration = 0) => {
      try {
        // This code fails when there is no cemeteries in the database.
        // For that reason there is a try-catch block. It's not clean but it's enough.
        mapRef.current?.fitBounds(getBoundsForLandmarks(landmarks), {
          padding: 100,
          offset: [0, 10],
          duration,
        })
      } catch {
        // When it fails, no one cares because there is no cemeteries :)
      }
    },
    [landmarks],
  )

  useEffect(() => {
    fitLandmarks(500)
  }, [fitLandmarks, landmarks])

  return {
    mapRef,
    initialBounds,
    // searchQuery,
    // setSearchQuery,
    // selectedTypes,
    // toggleSelectedTypes,
    // hoveredLandmarkSlug,
    // setHoveredLandmarkSlug,
    // isMapOrFiltersDisplayed,
    // setMapOrFiltersDisplayed,
  }
}
