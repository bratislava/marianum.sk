import Head from 'next/head'
import React, { ReactNode } from 'react'

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
    <>
      <Head>
        <title>Next.js + TypeScript</title>
      </Head>

      <header>
        <Navigation faqLink={faqLink} phoneNumber={phoneNumber} navigationItems={navigation} />
        {header}
      </header>
      <main className="bg-background-beige">{children}</main>
      <footer />
    </>
  )
}

export default PageWrapper
