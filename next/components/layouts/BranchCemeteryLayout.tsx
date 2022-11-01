import { ReactNode } from 'react'

import {
  BranchEntityFragment,
  CemeteryEntityFragment,
  GeneralEntityFragment,
  NavigationItemFragment,
} from '../../graphql'
import SideBarContact from '../molecules/SideBarContact'
import HeroSection from '../sections/HeroSection'
import ImageGallery from '../sections/ImageGallery'
import PageWrapper from './PageWrapper'

type BranchCemeteryLayoutProps = {
  entity: BranchEntityFragment | CemeteryEntityFragment
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  children?: ReactNode
}

const BranchCemeteryLayout = ({
  entity,
  navigation,
  children,
  general,
}: BranchCemeteryLayoutProps) => {
  const { title, slug, contact, medias } = entity.attributes ?? {}
  const { title: contactTitle, phone1, phone2, email } = contact?.data?.attributes ?? {}

  return (
    <PageWrapper
      navigation={navigation}
      general={general}
      header={
        <HeroSection
          breadcrumbsMoreItems={[{ label: title, path: slug ?? '' }]}
          moreContent={
            medias?.data?.length ? (
              <ImageGallery images={medias?.data} variant="aside" />
            ) : undefined
          }
        />
      }
    >
      <div className="h-full">
        <div className="container relative grid h-auto gap-6 pt-24 pb-20 md:grid-flow-col md:grid-cols-[1fr_auto]">
          {children}

          <SideBarContact title={contactTitle} phone1={phone1} phone2={phone2} email={email} />
        </div>
      </div>
    </PageWrapper>
  )
}

export default BranchCemeteryLayout