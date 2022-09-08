import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import useSWR from 'swr'

import { client } from '../../utils/gql'
import { isDefined } from '../../utils/isDefined'
import ArticleCard from '../molecules/Cards/ArticleCard'

const NewsListing = () => {
  const { i18n } = useTranslation()

  const { data, error } = useSWR(['News', i18n.language], (_key, locale) => client.News({ locale }))

  const filteredNews = useMemo(() => {
    return data?.articles?.data?.map((article) => article.attributes).filter(isDefined)
  }, [data?.articles])

  // // TODO replace by proper loading and error
  if (!data && !error) {
    return <div>Loading...</div>
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
        const { title, publishedAt, coverMedia, slug, articleCategory } = article

        return (
          <ArticleCard
            title={title}
            image={coverMedia.data?.attributes}
            date={publishedAt}
            // TODO link: add proper link
            linkHref={slug}
            category={articleCategory?.data}
          />
        )
      })}
    </div>
  )
}

export default NewsListing
