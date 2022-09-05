import cx from 'classnames'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import {
  Enum_Page_Layout,
  GeneralEntityFragment,
  NavigationItemFragment,
  PageEntityFragment,
} from '../../graphql'
import { getBreadcrumbs } from '../../utils/getBreadcrumbs'
import SideBar from '../molecules/SideBar'
import HeroSection from '../sections/HeroSection'
import PageWrapper from './PageWrapper'

type LayoutProps = {
  page: PageEntityFragment
  navigation: NavigationItemFragment[]
  children?: ReactNode
  general: GeneralEntityFragment | null
}

const Layout = ({ page, navigation, children, general }: LayoutProps) => {
  const router = useRouter()
  const breadcrumbs = getBreadcrumbs(router.asPath, navigation)

  return (
    <PageWrapper
      navigation={navigation}
      header={
        page.attributes?.layout === Enum_Page_Layout.Fullwidth ||
        page.attributes?.layout === Enum_Page_Layout.Sidebar ? (
          <HeroSection
            title={page.attributes?.title}
            perex={page.attributes?.perex}
            cta={page.attributes?.ctaButton}
            breadcrumbs={breadcrumbs}
          />
        ) : (
          // Display just breadcrumbs for Centered layout
          <HeroSection breadcrumbs={breadcrumbs} />
        )
      }
      general={general}
    >
      <div className="h-full">
        <div
          className={cx('h-auto', {
            // Add container for all layouts except 'fullwidth'
            'container relative mx-auto': page.attributes?.layout !== Enum_Page_Layout.Fullwidth,
            // Set grid for Sidebar layout
            'grid gap-6 p-4 md:grid-flow-col md:grid-cols-[1fr_auto] md:py-20':
              page.attributes?.layout === Enum_Page_Layout.Sidebar,
            // Center content for Centered layout
            'px-4 pb-6 sm:px-20 sm:pb-12 md:px-28 lg:px-40':
              page.attributes?.layout === Enum_Page_Layout.Centered,
            'pt-6 sm:pt-12': page.attributes?.layout === Enum_Page_Layout.Centered,
          })}
        >
          {/* Show title and perex for Centered layout */}
          {page.attributes?.layout === Enum_Page_Layout.Centered && (
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
