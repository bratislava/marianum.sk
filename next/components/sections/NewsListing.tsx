import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import useSWR from 'swr'

import { getNewsListingSwrKey, newsListingFetcher } from '../../utils/fetchers/newsListingFetcher'
import { isDefined } from '../../utils/isDefined'
import useGetSwrExtras from '../../utils/useGetSwrExtras'
import Loading from '../atoms/Loading'
import ArticleCard from '../molecules/Cards/ArticleCard'
import { useSlug } from '../molecules/Navigation/NavigationProvider/useFullSlug'

const NewsListing = () => {
  const { i18n } = useTranslation()
  const { getFullSlug } = useSlug()

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
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {filteredNews?.map((article) => {
        const { title, publishedAt, coverMedia, slug, newsCategory } = article.attributes ?? {}

        return (
          <ArticleCard
            key={slug}
            title={title ?? ''}
            image={coverMedia?.data?.attributes}
            date={publishedAt}
            linkHref={getFullSlug(article) ?? ''}
            category={newsCategory?.data}
            border
          />
        )
      })}
    </div>
  )
}

export default NewsListing
