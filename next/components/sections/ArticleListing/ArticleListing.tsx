import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { SearchResponse } from 'meilisearch'
import { useTranslation } from 'next-i18next'
import { useEffect, useRef, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import Loading from '@/components/atoms/Loading'
import LoadingOverlay from '@/components/atoms/LoadingOverlay'
import ArticleCard from '@/components/molecules/Cards/ArticleCard'
import FilteringSearchInput from '@/components/molecules/FilteringSearchInput'
import FiltersBackgroundWrapper from '@/components/molecules/FiltersBackgroundWrapper'
import { useGetFullPathMeili } from '@/components/molecules/Navigation/NavigationProvider/useGetFullPath'
import PaginationMeili from '@/components/molecules/PaginationMeili'
import Section from '@/components/molecules/Section'
import ArticleJobsCategoriesSelect from '@/components/sections/ArticleListing/ArticleJobsCategoriesSelect'
import ArticleNewsCategoriesSelect from '@/components/sections/ArticleListing/ArticleNewsCategoriesSelect'
import ArticlePressCategoriesSelect from '@/components/sections/ArticleListing/ArticlePressCategoriesSelect'
import {
  articlesDefaultFilters,
  ArticlesFilters,
  ArticleType,
  getMeiliArticlesQueryKey,
  meiliArticlesFetcher,
} from '@/services/fetchers/articles/articlesFetcher'
import { ArticleMeili } from '@/services/meili/meiliTypes'
import { useScrollToViewIfDataChange } from '@/utils/useScrollToViewIfDataChange'

const Articles = ({
  data,
  filters,
  type,
}: {
  data: SearchResponse<ArticleMeili>
  filters: ArticlesFilters
  type: ArticleType
}) => {
  const { t } = useTranslation()

  const { getFullPathMeili } = useGetFullPathMeili()
  const cardsRef = useRef<HTMLDivElement>(null)
  useScrollToViewIfDataChange(data, filters, cardsRef)

  if (data.hits?.length > 0) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" ref={cardsRef}>
        <h2 className="sr-only">{t('ArticleListing.aria.results')}</h2>
        {data.hits.map((article) => {
          const {
            title,
            publishedAt,
            coverMedia,
            slug,
            newsCategory,
            pressCategory,
            jobsCategory,
          } = article
          const category = (() => {
            switch (type) {
              case ArticleType.News:
                return { attributes: newsCategory }

              case ArticleType.Press:
                return { attributes: pressCategory }

              case ArticleType.Jobs:
                return { attributes: jobsCategory }

              default:
                return null
            }
          })()

          return (
            <ArticleCard
              key={slug}
              title={title}
              image={coverMedia}
              date={publishedAt}
              linkHref={getFullPathMeili('article', article) ?? ''}
              category={category}
            />
          )
        })}
      </div>
    )
  }

  return <strong>{t('ArticleListing.noNews')}</strong>
}

const DataWrapper = ({
  filters,
  description,
  onPageChange,
  type,
}: {
  filters: ArticlesFilters
  description?: string | null
  onPageChange: (page: number) => void
  type: ArticleType
}) => {
  const { i18n } = useTranslation()
  const locale = i18n.language

  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: getMeiliArticlesQueryKey({ filters, type, locale }),
    queryFn: () => meiliArticlesFetcher({ filters, type, locale }),
    placeholderData: keepPreviousData,
  })

  if (isPending) {
    return <Loading />
  }

  // TODO replace by proper error
  if (isError) {
    return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  }

  return (
    <>
      <LoadingOverlay loading={isFetching}>
        <Articles data={data} filters={filters} type={type} />
      </LoadingOverlay>

      {description && <p className="pt-4 md:pt-6">{description}</p>}
      {data.hits.length > 0 ? (
        <PaginationMeili
          data={data}
          pageSize={filters.pageSize}
          selectedPage={filters.page}
          onPageChange={onPageChange}
        />
      ) : null}
    </>
  )
}

type ArticleListingProps = {
  type: ArticleType
}

const ArticleListing = ({ type }: ArticleListingProps) => {
  const [filters, setFilters] = useState(articlesDefaultFilters)
  const [searchInputValue, setSearchInputValue] = useState('')
  const [debouncedSearchInputValue] = useDebounceValue(searchInputValue, 300)

  useEffect(() => {
    if (filters.search !== debouncedSearchInputValue) {
      setFilters({ ...filters, search: debouncedSearchInputValue, page: 1 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchInputValue])

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  const handleCategoryChange = (categoryId: string | null) => {
    setFilters({ ...filters, page: 1, categoryId })
  }

  return (
    <Section overlayWithHero>
      <FiltersBackgroundWrapper className="mb-4 grid grid-cols-1 gap-4 md:mb-6 md:grid-cols-3">
        <div>
          {type === ArticleType.Press ? (
            <ArticlePressCategoriesSelect onCategoryChange={handleCategoryChange} />
          ) : null}
          {type === ArticleType.News ? (
            <ArticleNewsCategoriesSelect onCategoryChange={handleCategoryChange} />
          ) : null}
          {type === ArticleType.Jobs ? (
            <ArticleJobsCategoriesSelect onCategoryChange={handleCategoryChange} />
          ) : null}
        </div>
        <div className="md:col-span-2">
          <FilteringSearchInput
            value={searchInputValue}
            onChange={(value) => setSearchInputValue(value)}
          />
        </div>
      </FiltersBackgroundWrapper>

      <div>
        <DataWrapper filters={filters} onPageChange={handlePageChange} type={type} />
      </div>
    </Section>
  )
}

export default ArticleListing
