import cx from 'classnames'
import Head from 'next/head'
import { ReactNode } from 'react'

import { NavigationItemFragment } from '../../graphql'
import Footer, { FooterProps } from '../molecules/Footer/Footer'
import Navigation from '../molecules/Navigation/Navigation'

type PageWrapperProps = {
  navigation: NavigationItemFragment[]
  faqLink: string
  phoneNumber: string
  header?: ReactNode
  children?: ReactNode
  footerProps: FooterProps
}

const PageWrapper = ({
  navigation,
  faqLink,
  phoneNumber,
  header,
  children,
  footerProps,
}: PageWrapperProps) => {
  return (
    <>
      <Head>
        <title>Next.js + TypeScript</title>
      </Head>

      <header>
        <Navigation faqLink={faqLink} phoneNumber={phoneNumber} navigationItems={navigation} />
        {header}
      </header>
      <main className={cx('bg-background-beige')}>{children}</main>
      <Footer {...footerProps} />
    </>
  )
}

export default PageWrapper
