import ImagePlaceholder from '@components/atoms/ImagePlaceholder'
import { useTailwindBreakpoint } from '@utils/useTailwindBreakpoint'
import last from 'lodash/last'
import Image from 'next/image'
import React, { useMemo } from 'react'

type FooterMapStaticProps = {
  latitude: string | null | undefined
  longitude: string | null | undefined
}

// https://docs.mapbox.com/api/maps/static-images/#custom-marker
const FooterMapStatic = ({ latitude, longitude }: FooterMapStaticProps) => {
  const { isSM, isMD, isLG, isXL } = useTailwindBreakpoint()

  // These are sizes of div that are used in layout, must be in sync with sizes in Footer component
  const height = useMemo(() => {
    return isLG ? 329 : isMD ? 281 : isSM ? 208 : 329
  }, [isSM, isMD, isLG])
  const width = useMemo(() => {
    return isXL ? 564 : isLG ? 464 : isMD ? 235 : isSM ? 576 : 464
  }, [isSM, isMD, isLG, isXL])

  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
  const styleId = last(process.env.NEXT_PUBLIC_MAPBOX_DARK_STYLE?.split('/'))

  // The image has transparent padding under the pinto center the tip of the pin in the middle of the image
  // It is uploaded to CDN from Marianum prod Strapi
  const markerURL = encodeURIComponent(
    'https://cdn-api.bratislava.sk/strapi-marianum/upload/map_marker_footer_padded_11457e9de5.png',
  )

  const staticMapboxUrl = useMemo(() => {
    if (!latitude || !longitude || !accessToken || !styleId) {
      return null
    }

    // Logo is disabled on purpose, it is not needed in this case, and to prevent the image to be mistaken for an interactive map
    return `https://api.mapbox.com/styles/v1/bratislava01/${styleId}/static/url-${markerURL}(${longitude},${latitude})/${longitude},${latitude},${14.5}/${width}x${height}@2x?logo=false&access_token=${accessToken}`
  }, [latitude, longitude, width, height, styleId, accessToken, markerURL])

  if (!staticMapboxUrl) {
    return <ImagePlaceholder />
  }

  // Empty alt on purpose
  return <Image src={staticMapboxUrl} alt="" fill className="object-cover" />
}

export default FooterMapStatic
