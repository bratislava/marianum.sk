import { GetStaticProps, GetStaticPropsResult } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import PageWrapper from '@/components/layouts/PageWrapper'
import SectionsWrapper from '@/components/layouts/SectionsWrapper'
import ErrorSection from '@/components/sections/ErrorSection'
import { GeneralEntityFragment, NavigationItemFragment } from '@/graphql'
import { client } from '@/services/graphql/gqlClient'
import { isDefined } from '@/utils/isDefined'

interface Error404PageProps {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
}

const Error404Page = ({ navigation, general }: Error404PageProps) => {
  const { t } = useTranslation('common')

  return (
    <PageWrapper navigation={navigation} general={general}>
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

  const [{ navigation, general }, translations] = await Promise.all([
    client.General({ locale }),
    serverSideTranslations(locale, ['common']),
  ])

  return {
    props: {
      navigation: navigation.filter(isDefined),
      general: general?.data ?? null,
      ...translations,
    },
    revalidate: 10,
  }
}

export default Error404Page
