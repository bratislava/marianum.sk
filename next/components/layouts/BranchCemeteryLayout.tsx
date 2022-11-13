import {
  BranchEntityFragment,
  CemeteryEntityFragment,
  GeneralEntityFragment,
  NavigationItemFragment,
} from '@graphql'
import cx from 'classnames'
import { ReactNode } from 'react'

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

  const hasMedias = !!medias?.data?.length

  return (
    <PageWrapper
      navigation={navigation}
      general={general}
      header={
        <HeroSection
          breadcrumbsMoreItems={[{ label: title, path: slug ?? '' }]}
          moreContent={
            hasMedias ? <ImageGallery images={medias?.data} variant="aside" /> : undefined
          }
        />
      }
    >
      <div className="h-full">
        <div
          className={cx(
            'container relative grid h-auto gap-6 pb-20 lg:grid-flow-col lg:grid-cols-[1fr_auto]',
            {
              'pt-24': hasMedias,
              'pt-6': !hasMedias,
            },
          )}
        >
          {children}

          <SideBarContact title={contactTitle} phone1={phone1} phone2={phone2} email={email} />
        </div>
      </div>
    </PageWrapper>
  )
}

export default BranchCemeteryLayout
