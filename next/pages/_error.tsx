/**
 * NOTE: This requires `@sentry/nextjs` version 7.3.0 or higher.
 *
 * This page is loaded by Nextjs:
 *  - on the server, when data-fetching methods throw or reject
 *  - on the client, when `getInitialProps` throws or rejects
 *  - on the client, when a React lifecycle method throws or rejects, and it's
 *    caught by the built-in Nextjs error boundary
 *
 * See:
 *  - https://nextjs.org/docs/basic-features/data-fetching/overview
 *  - https://nextjs.org/docs/api-reference/data-fetching/get-initial-props
 *  - https://reactjs.org/docs/error-boundaries.html
 */

import SectionsWrapper from '@components/layouts/SectionsWrapper'
import ErrorSection from '@components/sections/ErrorSection'
import * as Sentry from '@sentry/nextjs'
import { GetServerSideProps, GetServerSidePropsResult } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface ErrorPageProps {
  statusCode: number
  statusMessage: string | null
}

const ErrorPage = ({ statusCode, statusMessage }: ErrorPageProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'ErrorPage' })

  return (
    <SectionsWrapper alternateBackground className="pb-14">
      <ErrorSection
        code={statusCode}
        title={t('titleGeneralError')}
        message={statusMessage ?? t('messageGeneralError')}
      />
    </SectionsWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  ctx,
): Promise<GetServerSidePropsResult<ErrorPageProps>> => {
  const { locale = 'sk', res } = ctx

  const [translations] = await Promise.all([serverSideTranslations(locale, ['common'])])
  await Sentry.captureUnderscoreErrorException(ctx)

  return {
    props: {
      statusCode: res.statusCode,
      statusMessage: res.statusMessage ?? null,
      ...translations,
    },
  }
}

export default ErrorPage
