import cx from 'classnames'
import { ReactNode } from 'react'

import {
  Enum_Page_Layout,
  GeneralEntityFragment,
  NavigationItemFragment,
  PageEntityFragment,
} from '../../graphql'
import NormalizeSkText from '../atoms/NormalizeSkText'
import SideBar from '../molecules/SideBar'
import HeroSection from '../sections/HeroSection'
import PageWrapper from './PageWrapper'

type PageLayoutProps = {
  page: PageEntityFragment
  navigation: NavigationItemFragment[]
  children?: ReactNode
  general: GeneralEntityFragment | null
}

const PageLayout = ({ page, navigation, children, general }: PageLayoutProps) => {
  return (
    <PageWrapper
      navigation={navigation}
      header={
        page.attributes?.layout === Enum_Page_Layout.Fullwidth ||
        page.attributes?.layout === Enum_Page_Layout.Sidebar ? (
          <HeroSection
            title={page.attributes?.title}
            perex={page.attributes?.perex}
            ctaButton={page.attributes?.ctaButton}
          />
        ) : (
          // Display just breadcrumbs for Centered layout
          <HeroSection />
        )
      }
      general={general}
    >
      <div className="h-full pb-14">
        <div
          className={cx('h-auto', {
            // Add container for all layouts except 'fullwidth'
            'container relative py-6 md:pt-12 md:pb-20':
              page.attributes?.layout !== Enum_Page_Layout.Fullwidth,
            // Set grid for Sidebar layout
            'grid gap-6 lg:grid-flow-col lg:grid-cols-[1fr_auto]':
              page.attributes?.layout === Enum_Page_Layout.Sidebar,
            // Center content for Centered layout
            'sm:px-20 md:px-28 lg:px-40': page.attributes?.layout === Enum_Page_Layout.Centered,
          })}
        >
          {/* Show title and perex for Centered layout */}
          {page.attributes?.layout === Enum_Page_Layout.Centered && (
            <div className="pb-6 sm:pb-10">
              <h1 className="text-center">{page.attributes?.title}</h1>
              {page.attributes?.perex && (
                <p className="mt-6 sm:mt-8">
                  <NormalizeSkText>{page.attributes?.perex}</NormalizeSkText>
                </p>
              )}
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

export default PageLayout
