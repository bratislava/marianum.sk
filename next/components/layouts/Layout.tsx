import classnames from 'classnames'
import React, { ReactNode } from 'react'

import { Enum_Page_Layout, NavigationItemFragment, PageEntityFragment } from '../../graphql'
import SideBar from '../molecules/SideBar'
import HeroSection from '../sections/HeroSection'
import PageWrapper from './PageWrapper'

type LayoutProps = {
  page: PageEntityFragment
  navigation: NavigationItemFragment[]
  faqLink: string
  phoneNumber: string
  children?: ReactNode
}

const Layout = ({ page, navigation, faqLink, phoneNumber, children }: LayoutProps) => {
  return (
    <PageWrapper
      navigation={navigation}
      faqLink={faqLink}
      phoneNumber={phoneNumber}
      header={
        page.attributes?.layout === Enum_Page_Layout.Full ||
        page.attributes?.layout === Enum_Page_Layout.Sidebar ? (
          <HeroSection
            title={page.attributes?.title}
            description={page.attributes?.description}
            cta={page.attributes?.ctaButton}
          />
        ) : (
          // Display just breadcrumbs
          <HeroSection />
        )
      }
    >
      <div
        className={classnames({
          // Grid layout with sidebar
          'container relative mx-auto grid gap-6 p-4 md:auto-cols-auto md:grid-flow-col md:py-20':
            page.attributes?.layout === Enum_Page_Layout.Sidebar,
          // Centered layout
          'container relative mx-auto p-4 sm:py-12 sm:px-20 md:px-28 lg:px-40':
            page.attributes?.layout === Enum_Page_Layout.Centered,
        })}
      >
        {/* Centered layout */}
        {page.attributes?.layout === Enum_Page_Layout.Centered && (
          <div className="pb-6 sm:pb-10">
            <h1 className="text-center">{page.attributes?.title}</h1>
            {page.attributes?.description && (
              <p className="mt-6 sm:mt-8">{page.attributes?.description}</p>
            )}
          </div>
        )}

        {children}

        {page.attributes?.layout === Enum_Page_Layout.Sidebar && (
          <SideBar sidebar={page.attributes?.sidebar} />
        )}
      </div>{' '}
    </PageWrapper>
  )
}

export default Layout
