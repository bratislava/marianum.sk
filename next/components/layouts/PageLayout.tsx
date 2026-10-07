import { ReactNode } from 'react'

import NormalizeText from '@/components/atoms/NormalizeText/NormalizeText'
import PageWrapper from '@/components/layouts/PageWrapper'
import SideBar from '@/components/molecules/SideBar'
import HeroSection from '@/components/sections/HeroSection'
import {
  Enum_Page_Layout,
  GeneralEntityFragment,
  NavigationItemFragment,
  PageEntityFragment,
} from '@/graphql'
import cn from '@/utils/cn'

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
        page.layout === Enum_Page_Layout.Fullwidth || page.layout === Enum_Page_Layout.Sidebar ? (
          <HeroSection title={page.title} perex={page.perex} ctaButton={page.ctaButton} />
        ) : (
          // Display just breadcrumbs for Centered layout
          <HeroSection />
        )
      }
      general={general}
    >
      <div className="h-full pb-14">
        <div
          className={cn('h-auto', {
            // Add container for all layouts except 'fullwidth'
            'relative container py-6 md:pt-12 md:pb-20': page.layout !== Enum_Page_Layout.Fullwidth,
            // Set grid for Sidebar layout
            'grid grid-cols-1 gap-6 lg:grid-flow-col lg:grid-cols-[minmax(0,1fr)_auto]':
              page.layout === Enum_Page_Layout.Sidebar,
            // Center content for Centered layout
            'sm:px-20 md:px-28 lg:px-40': page.layout === Enum_Page_Layout.Centered,
          })}
        >
          {/* Show title and perex for Centered layout */}
          {page.layout === Enum_Page_Layout.Centered && (
            <div className="pb-6 sm:pb-10">
              <h1 className="text-center">{page.title}</h1>
              {page.perex && (
                <p className="mt-6 sm:mt-8">
                  <NormalizeText>{page.perex}</NormalizeText>
                </p>
              )}
            </div>
          )}

          {children}

          {/* Show sidebar for Sidebar layout */}
          {page.layout === Enum_Page_Layout.Sidebar && <SideBar sidebar={page.sidebar} />}
        </div>
      </div>
    </PageWrapper>
  )
}

export default PageLayout
