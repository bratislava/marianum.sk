import PageWrapper from '@components/layouts/PageWrapper'
import SideBar from '@components/molecules/SideBar'
import HeroSection from '@components/sections/HeroSection'
import { BundleEntityFragment, GeneralEntityFragment, NavigationItemFragment } from '@graphql'
import { ReactNode } from 'react'

type BundleLayoutProps = {
  bundle: BundleEntityFragment
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  children?: ReactNode
}

const BundleLayout = ({ bundle, navigation, children, general }: BundleLayoutProps) => {
  const { title, perex, price, slug } = bundle.attributes ?? {}

  return (
    <PageWrapper
      navigation={navigation}
      general={general}
      header={
        <HeroSection
          title={title}
          perex={perex}
          breadcrumbsMoreItems={[{ label: title, path: slug ?? '' }]}
          price={price}
        />
      }
    >
      <div className="h-full pb-14">
        <div className="container relative grid h-auto gap-6 pb-6 pt-10 md:pt-16 lg:grid-flow-col lg:grid-cols-[1fr_auto] lg:pb-20">
          {children}

          <SideBar sidebar={bundle.attributes?.sidebar} />
        </div>
      </div>
    </PageWrapper>
  )
}

export default BundleLayout
