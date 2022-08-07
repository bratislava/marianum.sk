import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Navigation from '../components/molecules/Navigation/Navigation'
import SectionExample from '../components/sections/SectionExample'
import { NavigationItemFragment } from '../graphql'
import { client } from '../utils/gql'

type HomeProps = {
  navigation: NavigationItemFragment[]
}

const Home = ({ navigation }: HomeProps) => {
  const { t } = useTranslation()

  return (
    <div className="bg-background-beige">
      <Navigation phoneNumber="+421 987 654 321" faqLink="/faq" navigationItems={navigation} />
      <div className="h-96" />
      <div>{t('general.hello')}</div>
      <div className="h-96" />
      <SectionExample />
      <div className="h-96" />
    </div>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale = 'sk' }) => {
  const [{ navigation }, translations] = await Promise.all([
    client.Navigation({ locale }),
    serverSideTranslations(locale, ['common']) as any,
  ])

  return {
    props: {
      navigation,
      ...translations,
    },
    revalidate: 10,
  }
}

export default Home
