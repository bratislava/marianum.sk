import Head from 'next/head'
import { ReactNode } from 'react'

import { GeneralEntityFragment, NavigationItemFragment } from '../../graphql'
import Footer from '../molecules/Footer/Footer'
import Navigation from '../molecules/Navigation/Navigation'

type PageWrapperProps = {
  navigation: NavigationItemFragment[]
  header?: ReactNode
  children?: ReactNode
  general: GeneralEntityFragment | null
}

const PageWrapper = ({ navigation, header, children, general }: PageWrapperProps) => {
  return (
    <div className="h-full">
      <Head>
        <title>Next.js + TypeScript</title>
      </Head>

      <header>
        <Navigation
          faqLink={general?.attributes?.header?.faqLink ?? ''}
          phoneNumber={general?.attributes?.header?.phoneNumber ?? ''}
          navigationItems={navigation}
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
  )
}

export default PageWrapper
