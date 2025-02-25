import ScrollToTopButton from '@components/atoms/ScrollToTopButton'
import Footer from '@components/molecules/Footer/Footer'
import Navigation from '@components/molecules/Navigation/Navigation'
import NavigationProvider from '@components/molecules/Navigation/NavigationProvider/NavigationProvider'
import { GeneralEntityFragment, NavigationItemFragment } from '@graphql'
import { isDefined } from '@utils/isDefined'
import { ReactNode } from 'react'

type PageWrapperProps = {
  navigation: NavigationItemFragment[]
  header?: ReactNode
  children?: ReactNode
  general: GeneralEntityFragment | null
}

/* eslint-disable @typescript-eslint/restrict-template-expressions */
const NextPublicEnvsHtmlComment = () => {
  const headerHtmlComment = `
  <!-- 
  === public env vars ===
  NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: ${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
  NEXT_PUBLIC_MAPBOX_DARK_STYLE: ${process.env.NEXT_PUBLIC_MAPBOX_DARK_STYLE}
  NEXT_PUBLIC_MAPBOX_LIGHT_STYLE: ${process.env.NEXT_PUBLIC_MAPBOX_LIGHT_STYLE}
  
  NEXT_PUBLIC_MEILISEARCH_HOST: ${process.env.NEXT_PUBLIC_MEILISEARCH_HOST}
  NEXT_PUBLIC_MEILISEARCH_SEARCH_API_KEY: ${process.env.NEXT_PUBLIC_MEILISEARCH_SEARCH_API_KEY}
  
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: ${process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
  NEXT_PUBLIC_HOTJAR_SITE_ID: ${process.env.NEXT_PUBLIC_HOTJAR_SITE_ID}
  
  NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: ${process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
  =======================
  -->
  `

  return (
    <div
      id="next_public_env_vars"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: headerHtmlComment,
      }}
    />
  )
}
/* eslint-enable @typescript-eslint/restrict-template-expressions */

const PageWrapper = ({ navigation, header, children, general }: PageWrapperProps) => {
  return (
    <NavigationProvider navigation={navigation} general={general}>
      <div className="h-full">
        <header>
          <NextPublicEnvsHtmlComment />
          <Navigation contact={general?.attributes?.header?.contact?.data} />
          {header}
        </header>

        <main className="bg-background-beige">{children}</main>

        <Footer
          contact={general?.attributes?.address}
          footer={general?.attributes?.footer}
          socials={general?.attributes?.socials?.filter(isDefined)}
        />

        <ScrollToTopButton />
      </div>
    </NavigationProvider>
  )
}

export default PageWrapper
