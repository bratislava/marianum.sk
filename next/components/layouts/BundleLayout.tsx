import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import { BundleEntityFragment, GeneralEntityFragment, NavigationItemFragment } from '../../graphql'
import { getBreadcrumbs } from '../../utils/getBreadcrumbs'
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
  const router = useRouter()

  const { title, perex, price, slug } = bundle.attributes ?? {}

  const breadcrumbs = getBreadcrumbs(router.asPath, navigation, [{ label: title, link: slug }])

  return (
    <PageWrapper
      navigation={navigation}
      general={general}
      header={<HeroSection title={title} perex={perex} breadcrumbs={breadcrumbs} price={price} />}
    >
      <div className="h-full">
        <div className="container relative grid h-auto gap-6 md:grid-flow-col md:grid-cols-[1fr_auto] md:py-20">
          {children}

          <SideBar sidebar={bundle.attributes?.sidebar} />
        </div>
      </div>
    </PageWrapper>
  )
}

export default BundleLayout
