import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'

import Loading from '@/components/atoms/Loading'
import ArticleGroup from '@/components/sections/ArticleGroup'
import { getGraphqlNewsQueryKey, graphqlNewsFetcher } from '@/services/fetchers/newsListingFetcher'
import { isDefined } from '@/utils/isDefined'

const NewsListing = () => {
  const { t, i18n } = useTranslation()
  const locale = i18n.language

  const { data, isPending, isError, error } = useQuery({
    queryKey: getGraphqlNewsQueryKey(locale),
    queryFn: () => graphqlNewsFetcher(locale),
    placeholderData: keepPreviousData,
    select: (dataFromQuery) => dataFromQuery.articles?.data.filter(isDefined) ?? [],
  })

  if (isPending) {
    return <Loading />
  }

  // TODO replace by proper error
  if (isError) {
    return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  }

  return data.length > 0 ? (
    <ArticleGroup articles={data} />
  ) : (
    // TODO replace by proper message
    <div>{t('NewsListing.nothingToShow')}</div>
  )
}

export default NewsListing
