import { ReactNode } from 'react'

import { BundleEntityFragment, GeneralEntityFragment, NavigationItemFragment } from '../../graphql'
import SideBar from '../molecules/SideBar'
import HeroSection from '../sections/HeroSection'
import PageWrapper from './PageWrapper'

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
      <div className="h-full">
        <div className="container relative grid h-auto gap-6 pt-10 pb-20 md:grid-flow-col md:grid-cols-[1fr_auto] md:pt-16 md:pb-32">
          {children}

          <SideBar sidebar={bundle.attributes?.sidebar} />
        </div>
      </div>
    </PageWrapper>
  )
}

export default BundleLayout
