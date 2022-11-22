import RichText from '@components/atoms/RichText'
import { ApplicationText } from '@graphql'
import { client } from '@services/graphql/gqlClient'
import { GetStaticProps, GetStaticPropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type ApplicationConsentsPageProps = {
  texts: ApplicationText
}

export const ApplicationConsentsPage = ({ texts }: ApplicationConsentsPageProps) => {
  return (
    <div className="container flex flex-col gap-y-4 py-2">
      {texts.zavaznostOdoslanejZiadosti ? (
        <div>
          <h1 className="text-h3">
            Vyhlásenie o záväznosti odoslanej žiadosti a platnosti údajov v nej uvedených
          </h1>
          <RichText content={texts.zavaznostOdoslanejZiadosti} className="mb-4" />
        </div>
      ) : null}
      {texts.spracovanieOsobnychUdajov ? (
        <div>
          <h1 className="text-h3">Súhlas so spracovaním osobných údajov</h1>
          <RichText content={texts.spracovanieOsobnychUdajov} className="mb-4" />
        </div>
      ) : null}
      {texts.spracovanieOsobnychUdajovMarketing ? (
        <div>
          <h1 className="text-h3">Súhlasím so spracovaním osobných údajov na marketingové účely</h1>
          <RichText content={texts.spracovanieOsobnychUdajovMarketing} className="mb-4" />
        </div>
      ) : null}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({
  locale = 'sk',
}): Promise<GetStaticPropsResult<ApplicationConsentsPageProps>> => {
  const [texts, translations] = await Promise.all([
    client.ApplicationTexts().then((response) => response.applicationText?.data?.attributes ?? {}),
    serverSideTranslations(locale, ['common']),
  ])

  if (!texts) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      texts,
      ...translations,
    },
    revalidate: 10,
  }
}

export default ApplicationConsentsPage
