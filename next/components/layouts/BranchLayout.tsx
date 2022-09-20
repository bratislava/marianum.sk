import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import { BranchEntityFragment, GeneralEntityFragment, NavigationItemFragment } from '../../graphql'
import { getBreadcrumbs } from '../../utils/getBreadcrumbs'
import HeroSection from '../sections/HeroSection'
import ImageGallery from '../sections/ImageGallery'
import PageWrapper from './PageWrapper'

type BranchLayoutProps = {
  branch: BranchEntityFragment
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  children?: ReactNode
}

const BranchLayout = ({ branch, navigation, children, general }: BranchLayoutProps) => {
  const router = useRouter()

  const { title, slug } = branch.attributes ?? {}

  const breadcrumbs = getBreadcrumbs(router.asPath, navigation, [{ label: title, link: slug }])

  return (
    <PageWrapper
      navigation={navigation}
      general={general}
      header={
        <HeroSection
          breadcrumbs={breadcrumbs}
          moreContent={<ImageGallery images={branch?.attributes?.medias?.data} variant="aside" />}
        />
      }
    >
      <div className="h-full">
        <div className="container relative mx-auto grid h-auto gap-6 px-4 pt-24 pb-20 md:grid-flow-col md:grid-cols-[1fr_auto]">
          {children}

          {/* TODO add hardcoded sidebar */}
          {/* <SideBar sidebar={sidebar} /> */}
          <aside className="h-[250px] bg-white md:w-[360px]">Kontakty TODO</aside>
        </div>
      </div>
    </PageWrapper>
  )
}

export default BranchLayout
