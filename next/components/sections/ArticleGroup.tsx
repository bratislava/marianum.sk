import ArticleCard from '@/components/molecules/Cards/ArticleCard'
import { useGetFullPath } from '@/components/molecules/Navigation/NavigationProvider/useGetFullPath'
import { ArticleCardEntityFragment } from '@/graphql'

type ArticleGroupProps = {
  articles: ArticleCardEntityFragment[]
}

const ArticleGroup = ({ articles }: ArticleGroupProps) => {
  const { getFullPath } = useGetFullPath()

  return (
    <div className="-mx-2 -mb-6 -mt-2 flex grid-cols-2 gap-4 overflow-x-auto px-2 pb-6 pt-2 scrollbar-hide md:grid md:gap-6 lg:grid-cols-4">
      {articles?.map((article) => {
        const { title, publishedAt, coverMedia, newsCategory } = article.attributes ?? {}

        return (
          <ArticleCard
            className="w-[calc(100vw-6rem)] shrink-0 sm:w-[calc(100vw-16rem)] md:w-full"
            key={article.id}
            title={title ?? ''}
            image={coverMedia?.data?.attributes}
            date={publishedAt}
            linkHref={getFullPath(article) ?? ''}
            category={newsCategory?.data}
          />
        )
      })}
    </div>
  )
}

export default ArticleGroup
