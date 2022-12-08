import { ApplicationCemeteries } from '@components/sections/Application/application.types'
import { partitionCemeteries } from '@components/sections/Application/application.utils'
import { ApplicationSection } from '@components/sections/Application/ApplicationSection'
import { ApplicationText } from '@graphql'
import { client } from '@services/graphql/gqlClient'
import { GetStaticProps, GetStaticPropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type ApplicationPageProps = {
  cemeteries: ApplicationCemeteries
  texts: ApplicationText
}

export const ApplicationPage = (props: ApplicationPageProps) => {
  return <ApplicationSection {...props} />
}

export const getStaticProps: GetStaticProps = async ({
  locale = 'sk',
}): Promise<GetStaticPropsResult<ApplicationPageProps>> => {
  const [cemeteries, texts, translations] = await Promise.all([
    client.CemeteriesInApplication({ locale }).then((response) => response.cemeteries?.data),
    client.ApplicationTexts().then((response) => response.applicationText?.data?.attributes ?? {}),
    serverSideTranslations(locale, ['common']),
  ])

  if (!cemeteries) {
    return {
      notFound: true,
    }
  }

  const partitionedCemeteries = partitionCemeteries(cemeteries)

  // Remove to make publicly available
  if (['localhost', 'dev', 'staging'].includes(process.env.DEPLOY_ENV as string)) {
    return {
      props: {
        cemeteries: partitionedCemeteries,
        texts,
        ...translations,
      },
      revalidate: 10,
    }
  }

  return {
    notFound: true,
  }
}

export default ApplicationPage
