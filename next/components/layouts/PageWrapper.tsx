import classnames from 'classnames'
import Head from 'next/head'
import React, { ReactNode } from 'react'

import { NavigationItemFragment } from '../../graphql'
import Footer from '../molecules/Footer/Footer'
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
    <>
      <Head>
        <title>Next.js + TypeScript</title>
      </Head>

      <header>
        <Navigation faqLink={faqLink} phoneNumber={phoneNumber} navigationItems={navigation} />
        {header}
      </header>
      <main className={classnames('bg-background-beige')}>{children}</main>
      <Footer
        markerLat={48.148_598}
        markerLng={17.107_748}
        navigateToLink="https://google.com"
        address="Šafárikovo námestie 3, 811 02 Bratislava"
        openingHours="09:00 - 18:00"
        phoneNumber="+421 987 654 321"
        emailAddress="kontakt@marianum.sk"
        contactPageLink="/kontakt"
      />
    </>
  )
}

export default PageWrapper
