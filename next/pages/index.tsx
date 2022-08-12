/* eslint-disable sonarjs/no-duplicate-string */
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import PageWrapper from '../components/layouts/PageWrapper'
import HomepageSlider from '../components/sections/HomepageSlider'
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
