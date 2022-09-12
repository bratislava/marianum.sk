/* eslint-disable sonarjs/no-duplicate-string */
import { GetStaticProps, GetStaticPropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import PageWrapper from '../components/layouts/PageWrapper'
import Row from '../components/molecules/Row'
import { GeneralEntityFragment, NavigationItemFragment } from '../graphql'
import { client } from '../utils/gql'

type HomeProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
}

const Home = ({ navigation, general }: HomeProps) => {
  return (
    <PageWrapper navigation={navigation} general={general}>
      <div>
        <h1>Výsledky vyhľadávania</h1>
        <div>
          <Row
            title="Hladany termin"
            link="#hadany-termin"
            showUrl
            metadata={['Metadata', 'Metadata', 'Metadata']}
            border
          />
        </div>
      </div>
    </PageWrapper>
  )
}

export const getStaticProps: GetStaticProps = async ({
  locale = 'sk',
}): Promise<GetStaticPropsResult<HomeProps>> => {
  const [{ navigation, general }, translations] = await Promise.all([
    client.General({ locale }),
    serverSideTranslations(locale, ['common']),
  ])

  const filteredNavigation = navigation.filter(Boolean) as NavigationItemFragment[]

  return {
    props: {
      navigation: filteredNavigation,
      general: general?.data ?? null,
      ...translations,
    },
    revalidate: 10,
  }
}

export default Home
