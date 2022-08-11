import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import PageWrapper from '../components/layouts/PageWrapper'
import { NavigationItemFragment } from '../graphql'
import { client } from '../utils/gql'

type HomeProps = {
  navigation: NavigationItemFragment[]
  faqLink: string
  phoneNumber: string
}

const Home = ({ navigation, faqLink, phoneNumber }: HomeProps) => {
  const { t } = useTranslation()

  return (
    <PageWrapper navigation={navigation} faqLink={faqLink} phoneNumber={phoneNumber}>
      {t('general.hello')}
    </PageWrapper>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale = 'sk' }) => {
  const [{ navigation, general }, translations] = await Promise.all([
    client.Navigation({ locale }),
    serverSideTranslations(locale, ['common']) as any,
  ])

  return {
    props: {
      navigation,
      faqLink: general?.data?.attributes?.header?.faqLink ?? '',
      phoneNumber: general?.data?.attributes?.header?.phoneNumber ?? '',
      ...translations,
    },
    revalidate: 10,
  }
}

export default Home
