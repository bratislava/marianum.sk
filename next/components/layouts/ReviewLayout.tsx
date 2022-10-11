import { ReactNode } from 'react'

import { GeneralEntityFragment, NavigationItemFragment } from '../../graphql'
import HeroSection from '../sections/HeroSection'
import PageWrapper from './PageWrapper'

type ReviewLayoutProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  children?: ReactNode
  sidebar?: ReactNode
}

const ReviewLayout = ({ navigation, children, sidebar, general }: ReviewLayoutProps) => {
  return (
    <PageWrapper
      navigation={navigation}
      general={general}
      header={
        <HeroSection
          title="Reviews"
          breadcrumbsMoreItems={[
            { label: 'About us', path: '/o-nas' },
            { label: 'Reviews', path: '/o-nas/reviews' },
          ]}
        />
      }
    >
      <div className="h-full">
        <div className="container relative grid h-auto gap-20 pt-12 pb-32 lg:grid-flow-col lg:grid-cols-[1fr_1fr] lg:gap-6">
          <div>{children}</div>
          <div>{sidebar}</div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default ReviewLayout
