import { ReactNode } from 'react'

import { GeneralEntityFragment, NavigationItemFragment } from '../../graphql'
import HeroSection from '../sections/HeroSection'
import PageWrapper from './PageWrapper'

type ReviewLayoutProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  children?: ReactNode
}

const ReviewLayout = ({ navigation, children, general }: ReviewLayoutProps) => {
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
        <div className="container relative grid h-auto gap-6 pt-24 pb-20 md:grid-flow-col md:grid-cols-[1fr_auto]">
          {children}

          <div>sidebar</div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default ReviewLayout
