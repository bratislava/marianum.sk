import { ApplicationTypes } from '@components/sections/Application/application.types'
import { ApplicationSection } from '@components/sections/Application/ApplicationSection'
import { GetStaticProps } from 'next'

type ApplicationPageProps = {
  cemeteries: ApplicationTypes.Cemeteries
}

export const ApplicationPage = ({ cemeteries }: ApplicationPageProps) => {
  return <ApplicationSection cemeteries={cemeteries} />
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    notFound: true,
  }
}

// Uncomment to make publicly available when finished.
// export const getStaticProps: GetStaticProps = async ({
//   locale = 'sk',
// }): Promise<GetStaticPropsResult<ApplicationPageProps>> => {
//   const [cemeteries, translations] = await Promise.all([
//     client.CemeteriesInApplication({ locale }).then((response) => response.cemeteries?.data),
//     serverSideTranslations(locale, ['common']),
//   ])
//
//   if (!cemeteries) {
//     return {
//       notFound: true,
//     }
//   }
//
//   const partitionedCemeteries = partitionCemeteries(cemeteries)
//
//   return {
//     props: {
//       cemeteries: partitionedCemeteries,
//       ...translations,
//     },
//     revalidate: 10,
//   }
// }

export default ApplicationPage
