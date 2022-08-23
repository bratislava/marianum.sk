import last from 'lodash/last'
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next'
import { SSRConfig } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import HomeIcon from '../../assets/home.svg'
import Breadcrumbs from '../../components/atoms/Breadcrumbs'
import MLink from '../../components/atoms/MLink'
import PageWrapper from '../../components/layouts/PageWrapper'
import ImageGallerySection from '../../components/sections/ImageGallerySection'
import { BranchEntityFragment, NavigationItemFragment } from '../../graphql'
import { client } from '../../utils/gql'
import { isDefined } from '../../utils/isDefined'

type PageProps = {
  navigation: NavigationItemFragment[]
  faqLink: string
  phoneNumber: string
  branch: BranchEntityFragment
} & SSRConfig

const BranchSlug = ({ navigation, faqLink, phoneNumber, branch }: PageProps) => {
  return (
    <PageWrapper
      navigation={navigation}
      faqLink={faqLink}
      phoneNumber={phoneNumber}
      header={
        <div className="mb-18 bg-primary-dark text-white/72">
          <div className="container mx-auto">
            <div className="px-4">
              <Breadcrumbs className="sm:pt-8">
                <MLink aria-label="Domov" href="/" noStyles className="underline">
                  <HomeIcon />
                </MLink>
                <MLink href="/branches" noStyles className="underline">
                  Pobočky a cintoríny
                </MLink>
                <div>{branch.attributes?.title}</div>
              </Breadcrumbs>
            </div>
            <div className="-mt-18 translate-y-18 sm:px-4">
              <ImageGallerySection images={branch.attributes?.medias?.data} variant="aside" />
            </div>
          </div>
        </div>
      }
    >
      <div className="container mx-auto p-4">
        {/* todo: display branch data */}
        braaanch
      </div>
    </PageWrapper>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales = ['sk', 'en'] }) => {
  const pathArraysForLocales = await Promise.all(
    locales.map((locale) => client.BranchesStaticPaths({ locale })),
  )
  const branches = pathArraysForLocales
    .flatMap(({ branches: allBranches }) => allBranches?.data || [])
    .filter(isDefined)
  if (branches.length > 0) {
    const paths = branches
      .filter((branch) => branch.attributes?.slug)
      .map((branch) => ({
        params: {
          slug: branch?.attributes?.slug ? branch.attributes?.slug.split('/') : [],
          locale: branch?.attributes?.locale || '',
        },
      }))
    // eslint-disable-next-line no-console
    console.log(`BRANCHES: GENERATED STATIC PATHS FOR ${paths.length} SLUGS`)
    return { paths, fallback: 'blocking' }
  }
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({
  locale = 'sk',
  params,
}): Promise<GetStaticPropsResult<PageProps>> => {
  const slug = last(params?.slug) ?? ''

  const [{ navigation, general }, { branches }, translations] = await Promise.all([
    client.Navigation({ locale }),
    client.BranchBySlug({ locale, slug }),
    serverSideTranslations(locale, ['common']),
  ])

  const filteredNavigation = navigation.filter(Boolean) as NavigationItemFragment[]

  if (!branches || branches.data.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      navigation: filteredNavigation,
      faqLink: general?.data?.attributes?.header?.faqLink ?? '',
      phoneNumber: general?.data?.attributes?.header?.phoneNumber ?? '',
      branch: branches.data[0],
      ...translations,
    },
    revalidate: 10,
  }
}

export default BranchSlug
