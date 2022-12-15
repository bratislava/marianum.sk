import Loading from '@components/atoms/Loading'
import { useGetFullPath } from '@components/molecules/Navigation/NavigationProvider/useGetFullPath'
import ArticleGroup from '@components/sections/ArticleGroup'
import { getNewsListingSwrKey, newsListingFetcher } from '@services/fetchers/newsListingFetcher'
import { isDefined } from '@utils/isDefined'
import { useGetSwrExtras } from '@utils/useGetSwrExtras'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import useSWR from 'swr'

const NewsListing = () => {
  const { i18n } = useTranslation()

  const { data, error } = useSWR(
    getNewsListingSwrKey(i18n.language),
    newsListingFetcher(i18n.language),
  )

  const { loadingAndNoDataToDisplay, dataToDisplay } = useGetSwrExtras({
    data,
    error,
  })

  const filteredNews = useMemo(() => {
    return dataToDisplay?.articles?.data?.filter(isDefined)
  }, [dataToDisplay?.articles])

  // TODO replace by proper loading and error
  if (loadingAndNoDataToDisplay) {
    return <Loading />
  }

  if (error) {
    return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  }

  if (filteredNews?.length === 0) {
    return <div>Nothing to show</div>
  }

  return <ArticleGroup articles={filteredNews ?? []} />
}

export default NewsListing
