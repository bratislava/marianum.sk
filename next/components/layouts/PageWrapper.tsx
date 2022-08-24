import cx from 'classnames'
import Head from 'next/head'
import { ReactNode } from 'react'

import { GeneralEntityFragment, NavigationItemFragment } from '../../graphql'
import Footer from '../molecules/Footer/Footer'
import Navigation from '../molecules/Navigation/Navigation'

type PageWrapperProps = {
  navigation: NavigationItemFragment[]
  faqLink: string
  phoneNumber: string
  header?: ReactNode
  children?: ReactNode
  general: GeneralEntityFragment
}

const PageWrapper = ({
  navigation,
  faqLink,
  phoneNumber,
  header,
  children,
  general,
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
      <Footer
        contact={general.attributes?.contact}
        footer={general.attributes?.footer}
        social={general.attributes?.social}
      />
    </>
  )
}

export default PageWrapper
