/* eslint-disable sonarjs/no-duplicate-string */
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Navigation from '../components/molecules/Navigation/Navigation'
import HomepageSlider from '../components/sections/HomepageSlider'
import SectionExample from '../components/sections/SectionExample'
import { NavigationItemFragment } from '../graphql'
import { client } from '../utils/gql'

type HomeProps = {
  navigation: NavigationItemFragment[]
}

const Home = ({ navigation }: HomeProps) => {
  const { t } = useTranslation()

  return (
    <div>
      <Navigation phoneNumber="+421 987 654 321" faqLink="/faq" navigationItems={navigation} />
      <HomepageSlider
        slides={[
          {
            key: 'slide-1',
            title: 'Slide 1',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            imageSrc: '',
            buttonText: 'Zistiť viac',
          },
          {
            key: 'slide-2',
            title: 'Slide 2',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            imageSrc: '',
            buttonText: 'Zistiť viac',
          },
          {
            key: 'slide-3',
            title: 'Slide 3',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            imageSrc: '',
            buttonText: 'Zistiť viac',
          },
        ]}
      />
      <div>{t('general.hello')}</div>
      <SectionExample />
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
