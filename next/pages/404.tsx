import { GetStaticProps, GetStaticPropsResult } from 'next'
import { useTranslation } from 'next-i18next/pages'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'

import PageWrapper from '@/components/layouts/PageWrapper'
import SectionsWrapper from '@/components/layouts/SectionsWrapper'
import ErrorSection from '@/components/sections/ErrorSection'
import { GeneralEntityFragment } from '@/graphql'
import { client } from '@/services/graphql/gqlClient'
import { getNavigationStaticProps } from '@/services/navigation/getNavigationStaticProps'
import { NavigationPageProps } from '@/services/navigation/typesNavigation'

type Error404PageProps = {
  general: GeneralEntityFragment | null
} & NavigationPageProps

const Error404Page = ({ general }: Error404PageProps) => {
  const { t } = useTranslation()

  return (
    <PageWrapper general={general}>
      <SectionsWrapper alternateBackground className="pb-14">
        <ErrorSection
          code={404}
          title={t('ErrorPage.title404')}
          message={t('ErrorPage.message404')}
        />
      </SectionsWrapper>
    </PageWrapper>
  )
}

export const getStaticProps: GetStaticProps = async (
  ctx,
): Promise<GetStaticPropsResult<Error404PageProps>> => {
  const { locale = 'sk' } = ctx

  const [{ general }, translations, navigationStaticProps] = await Promise.all([
    client.General({ locale }),
    serverSideTranslations(locale),
    getNavigationStaticProps({ locale }),
  ])

  return {
    props: {
      navigationStaticProps,
      general: general?.data ?? null,
      ...translations,
    },
    revalidate: 10,
  }
}

export default Error404Page
