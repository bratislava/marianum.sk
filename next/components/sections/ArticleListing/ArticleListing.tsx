import Loading from '@components/atoms/Loading'
import LoadingOverlay from '@components/atoms/LoadingOverlay'
import ArticleCard from '@components/molecules/Cards/ArticleCard'
import FilteringSearchInput from '@components/molecules/FilteringSearchInput'
import FiltersBackgroundWrapper from '@components/molecules/FiltersBackgroundWrapper'
import { useGetFullPathMeili } from '@components/molecules/Navigation/NavigationProvider/useGetFullPath'
import PaginationMeili from '@components/molecules/PaginationMeili'
import Section from '@components/molecules/Section'
import ArticleJobsCategoriesSelect from '@components/sections/ArticleListing/ArticleJobsCategoriesSelect'
import ArticleNewsCategoriesSelect from '@components/sections/ArticleListing/ArticleNewsCategoriesSelect'
import ArticlePressCategoriesSelect from '@components/sections/ArticleListing/ArticlePressCategoriesSelect'
import {
  articleListingDefaultFilters,
  ArticleListingFilters,
  ArticleListingType,
  getArticleListingFetcher,
  getArticleListingSwrKey,
} from '@services/fetchers/articleListingFetcher'
import { ArticleMeili } from '@services/meili/meiliTypes'
import { useGetSwrExtras } from '@utils/useGetSwrExtras'
import { useScrollToViewIfDataChange } from '@utils/useScrollToViewIfDataChange'
import { SearchResponse } from 'meilisearch'
import { useTranslation } from 'next-i18next'
import { useEffect, useRef, useState } from 'react'
import useSwr from 'swr'
import { useDebounce } from 'usehooks-ts'

const Articles = ({
  data,
  filters,
  type,
}: {
  data: SearchResponse<ArticleMeili>
  filters: ArticleListingFilters
  type: ArticleListingType
}) => {
  const { t } = useTranslation('common', { keyPrefix: 'ArticleListing' })

  const { getFullPathMeili } = useGetFullPathMeili()
  const cardsRef = useRef<HTMLDivElement>(null)
  useScrollToViewIfDataChange(data, filters, cardsRef)

  if (data.hits?.length > 0) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" ref={cardsRef}>
        <h2 className="sr-only">{t('aria.results')}</h2>
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
              case ArticleListingType.News:
                return { attributes: newsCategory }

              case ArticleListingType.Press:
                return { attributes: pressCategory }

              case ArticleListingType.Jobs:
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
  return <strong>{t('noNews')}</strong>
}

const DataWrapper = ({
  filters,
  description,
  onPageChange,
  type,
}: {
  filters: ArticleListingFilters
  description?: string | null
  onPageChange: (page: number) => void
  type: ArticleListingType
}) => {
  const { i18n } = useTranslation()

  const { data, error } = useSwr(
    getArticleListingSwrKey(filters, type, i18n.language),
    getArticleListingFetcher(filters, type, i18n.language),
  )

  const { dataToDisplay, loadingAndNoDataToDisplay, delayedLoading } = useGetSwrExtras({
    data,
    error,
  })

  // TODO replace by proper loading and error
  if (loadingAndNoDataToDisplay) {
    return <Loading />
  }

  if (error) {
    return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  }

  return (
    <>
      <LoadingOverlay loading={delayedLoading}>
        {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion */}
        <Articles data={dataToDisplay!} filters={filters} type={type} />
      </LoadingOverlay>

      {description && <p className="pt-4 md:pt-6">{description}</p>}
      {dataToDisplay ? (
        <PaginationMeili
          data={dataToDisplay}
          pageSize={filters.pageSize}
          selectedPage={filters.page}
          onPageChange={onPageChange}
        />
      ) : null}
    </>
  )
}

type ArticleListingProps = {
  type: ArticleListingType
}

const ArticleListing = ({ type }: ArticleListingProps) => {
  const [filters, setFilters] = useState<ArticleListingFilters>(articleListingDefaultFilters)
  const [searchInputValue, setSearchInputValue] = useState<string>('')
  const debouncedSearchInputValue = useDebounce<string>(searchInputValue, 300)

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
          {type === ArticleListingType.Press ? (
            <ArticlePressCategoriesSelect onCategoryChange={handleCategoryChange} />
          ) : null}
          {type === ArticleListingType.News ? (
            <ArticleNewsCategoriesSelect onCategoryChange={handleCategoryChange} />
          ) : null}
          {type === ArticleListingType.Jobs ? (
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
