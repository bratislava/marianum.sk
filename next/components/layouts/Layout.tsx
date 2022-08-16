import cx from 'classnames'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'

import { Enum_Page_Layout, NavigationItemFragment, PageEntityFragment } from '../../graphql'
import { getBreadcrumbs } from '../../utils/getBreadcrumbs'
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
  const router = useRouter()
  const breadcrumbs = getBreadcrumbs(router.asPath, navigation)

  return (
    <PageWrapper
      navigation={navigation}
      faqLink={faqLink}
      phoneNumber={phoneNumber}
      header={
        page.attributes?.layout === Enum_Page_Layout.Fullwidth ||
        page.attributes?.layout === Enum_Page_Layout.Sidebar ? (
          <HeroSection
            title={page.attributes?.title}
            perex={page.attributes?.perex}
            cta={page.attributes?.ctaButton}
            breadcrumbs={breadcrumbs}
          />
        ) : page.attributes?.layout === Enum_Page_Layout.Article ? (
          <HeroSection image={page.attributes?.coverMedia?.data} breadcrumbs={breadcrumbs} />
        ) : (
          // Display just breadcrumbs for Centered and Article layout
          <HeroSection breadcrumbs={breadcrumbs} />
        )
      }
    >
      <div
        className={cx({
          // Change color to white for Article layout
          'bg-white': page.attributes?.layout === Enum_Page_Layout.Article,
          // Compensate image overlap
          'pt-18':
            page.attributes?.layout === Enum_Page_Layout.Article &&
            page.attributes.coverMedia?.data,
        })}
      >
        <div
          className={cx('container relative mx-auto', {
            // Set grid for Sidebar layout
            'grid gap-6 p-4 md:auto-cols-auto md:grid-flow-col md:py-20':
              page.attributes?.layout === Enum_Page_Layout.Sidebar,
            // Center content for Centered and Article layout
            'px-4 pb-6 sm:px-20 sm:pb-12 md:px-28 lg:px-40':
              page.attributes?.layout === Enum_Page_Layout.Centered ||
              page.attributes?.layout === Enum_Page_Layout.Article,
            'pt-6 sm:pt-12':
              page.attributes?.layout === Enum_Page_Layout.Centered ||
              (page.attributes?.layout === Enum_Page_Layout.Article &&
                !page.attributes.coverMedia?.data),
            'pt-6 sm:pt-10': page.attributes?.layout === Enum_Page_Layout.Article,
          })}
        >
          {/* Show publish date for Article layout */}
          {page.attributes?.layout === Enum_Page_Layout.Article && (
            <div className="pb-1 text-center text-sm">
              {/* TODO replace by date component or format function */}
              {new Date(page.attributes.publishedAt as string).toDateString()}
            </div>
          )}

          {/* Show title for Centered or Article layout */}
          {(page.attributes?.layout === Enum_Page_Layout.Centered ||
            page.attributes?.layout === Enum_Page_Layout.Article) && (
            <div className="pb-6 sm:pb-10">
              <h1 className="text-center">{page.attributes?.title}</h1>
              {page.attributes?.perex && <p className="mt-6 sm:mt-8">{page.attributes?.perex}</p>}
            </div>
          )}

          {children}

          {/* Show sidebar for Sidebar layout */}
          {page.attributes?.layout === Enum_Page_Layout.Sidebar && (
            <SideBar sidebar={page.attributes?.sidebar} />
          )}
        </div>
      </div>
    </PageWrapper>
  )
}

export default Layout
