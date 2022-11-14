import Loading from '@components/atoms/Loading'
import ArticleCard from '@components/molecules/Cards/ArticleCard'
import { useGetFullPath } from '@components/molecules/Navigation/NavigationProvider/useGetFullPath'
import { getNewsListingSwrKey, newsListingFetcher } from '@services/meili/fetchers'
import { isDefined, useGetSwrExtras } from '@utils'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import useSWR from 'swr'

const NewsListing = () => {
  const { i18n } = useTranslation()
  const { getFullPath } = useGetFullPath()

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

  // // TODO replace by proper loading and error
  if (loadingAndNoDataToDisplay) {
    return <Loading />
  }

  if (error) {
    return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  }

  if (filteredNews?.length === 0) {
    return <div>Nothing to show</div>
  }

  return (
    <div className="flex grid-cols-2 gap-4 overflow-x-auto md:grid md:gap-6 lg:grid-cols-4">
      {filteredNews?.map((article) => {
        const { title, publishedAt, coverMedia, slug, newsCategory } = article.attributes ?? {}

        return (
          <ArticleCard
            className="w-[calc(100vw-6rem)] shrink-0 sm:w-[calc(100vw-16rem)] md:w-full"
            key={slug}
            title={title ?? ''}
            image={coverMedia?.data?.attributes}
            date={publishedAt}
            linkHref={getFullPath(article) ?? ''}
            category={newsCategory?.data}
            border
          />
        )
      })}
    </div>
  )
}

export default NewsListing
