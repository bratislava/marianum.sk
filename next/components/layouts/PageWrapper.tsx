import Head from 'next/head'
import { ReactNode } from 'react'

import { GeneralEntityFragment, NavigationItemFragment } from '../../graphql'
import Footer from '../molecules/Footer/Footer'
import Navigation from '../molecules/Navigation/Navigation'
import NavigationProvider from './NavigationProvider'

type PageWrapperProps = {
  navigation: NavigationItemFragment[]
  header?: ReactNode
  children?: ReactNode
  general: GeneralEntityFragment | null
}

const PageWrapper = ({ navigation, header, children, general }: PageWrapperProps) => {
  return (
    <NavigationProvider navigation={navigation}>
      <div className="h-full">
        <Head>
          <title>Next.js + TypeScript</title>
        </Head>

        <header>
          <Navigation
            faqSlug={general?.attributes?.header?.faqPage?.data?.attributes?.slug}
            contact={general?.attributes?.header?.contact?.data}
          />
          {header}
        </header>

        <main className="bg-background-beige">{children}</main>

        <Footer
          contact={general?.attributes?.contact}
          footer={general?.attributes?.footer}
          social={general?.attributes?.social}
        />
      </div>
    </NavigationProvider>
  )
}

export default PageWrapper
