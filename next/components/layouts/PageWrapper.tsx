import Head from 'next/head'
import { ReactNode } from 'react'

import { NavigationItemFragment } from '../../graphql'
import Navigation from '../molecules/Navigation/Navigation'

type PageWrapperProps = {
  navigation: NavigationItemFragment[]
  faqLink: string
  phoneNumber: string
  header?: ReactNode
  children?: ReactNode
}

const PageWrapper = ({ navigation, faqLink, phoneNumber, header, children }: PageWrapperProps) => {
  return (
    <div className="h-full bg-background-beige">
      <Head>
        <title>Next.js + TypeScript</title>
      </Head>

      <header>
        <Navigation faqLink={faqLink} phoneNumber={phoneNumber} navigationItems={navigation} />
        {header}
      </header>
      <main>{children}</main>
      <footer />
    </div>
  )
}

export default PageWrapper
