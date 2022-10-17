import { SearchResponse } from 'meilisearch'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useRef, useState } from 'react'
import useSwr from 'swr'
import { useDebounce } from 'usehooks-ts'

import { ArticleListingFragment, Enum_Componentsectionsarticlelisting_Type } from '../../../graphql'
import { ArticleMeili } from '../../../types/meiliTypes'
import { isDefined } from '../../../utils/isDefined'
import { meiliClient } from '../../../utils/meilisearch'
import useGetSwrExtras from '../../../utils/useGetSwrExtras'
import { useScrollToViewIfDataChange } from '../../../utils/useScrollToViewIfDataChange'
import ArticleCard from '../../molecules/Cards/ArticleCard'
import FilteringSearchInput from '../../molecules/FilteringSearchInput'
import FiltersBackgroundWrapper from '../../molecules/FiltersBackgroundWrapper'
import { useSlugMeili } from '../../molecules/Navigation/NavigationProvider/useFullSlug'
import PaginationMeili from '../../molecules/PaginationMeili'
import Section from '../../molecules/Section'
import ArticleNewsCategoriesSelect from './ArticleNewsCategoriesSelect'
import ArticlePressCategoriesSelect from './ArticlePressCategoriesSelect'

const pageSize = 24

type Filters = {
  search: string
  categoryId: string | null
  page: number
}

const Articles = ({
  data,
  section,
}: {
  data: SearchResponse<ArticleMeili>
  section: ArticleListingFragment
}) => {
  const { t } = useTranslation('common', {
    keyPrefix: 'components.ArticleListing',
  })
  const { getFullSlugMeili } = useSlugMeili()
  const cardsRef = useRef<HTMLDivElement>(null)
  useScrollToViewIfDataChange(data, cardsRef)

  if (data.hits?.length > 0) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" ref={cardsRef}>
        {data.hits.map((article) => {
          const { title, publishedAt, coverMedia, slug, newsCategory, pressCategory } = article
          const category = (() => {
            switch (section.type) {
              case Enum_Componentsectionsarticlelisting_Type.News:
                return { attributes: newsCategory }

              case Enum_Componentsectionsarticlelisting_Type.Press:
                return { attributes: pressCategory }

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
              linkHref={getFullSlugMeili('article', article) ?? ''}
              category={category}
              border
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
  section,
}: {
  filters: Filters
  description?: string | null
  onPageChange: (page: number) => void
  section: ArticleListingFragment
}) => {
  const { i18n } = useTranslation()

  const sectionFilter = useMemo(() => {
    switch (section.type) {
      case Enum_Componentsectionsarticlelisting_Type.Press:
        return filters.categoryId
          ? `pressCategory.id = ${filters.categoryId}`
          : // TODO: hacky solution, after update to Meilisearch 0.29 use "pressCategory EXISTS"
            'pressCategory.id > 0'

      case Enum_Componentsectionsarticlelisting_Type.News:
        return filters.categoryId
          ? `newsCategory.id = ${filters.categoryId}`
          : // TODO: hacky solution, after update to Meilisearch 0.29 use "newsCategory EXISTS"
            'newsCategory.id > 0'

      default:
        return null
    }
  }, [section.type, filters.categoryId])

  const { data, error } = useSwr(['ArticleListing', filters, section.type], () => {
    return meiliClient.index('article').search<ArticleMeili>(filters.search, {
      limit: pageSize,
      offset: (filters.page - 1) * pageSize,
      filter: [sectionFilter, i18n.language ? `locale = ${i18n.language}` : null].filter(isDefined),
      sort: ['publishedAtTimestamp:desc'],
    })
  })

  const { dataToDisplay, loadingAndNoDataToDisplay } = useGetSwrExtras({
    data,
    error,
  })

  // TODO replace by proper loading and error
  if (loadingAndNoDataToDisplay) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  }

  return (
    <>
      {/* TODO: Use loading overlay with spinner */}
      {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion */}
      <Articles data={dataToDisplay!} section={section} />

      {description && <p className="pt-4 md:pt-6">{description}</p>}
      {dataToDisplay ? (
        <PaginationMeili
          data={dataToDisplay}
          pageSize={pageSize}
          selectedPage={filters.page}
          onPageChange={onPageChange}
        />
      ) : null}
    </>
  )
}

type ArticleListingProps = {
  section: ArticleListingFragment
}

// TODO: Overlap with header
const ArticleListing = ({ section }: ArticleListingProps) => {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    page: 1,
    categoryId: null,
  })
  const [searchInputValue, setSearchInputValue] = useState<string>('')
  const debouncedSearchInputValue = useDebounce<string>(searchInputValue, 300)

  useEffect(() => {
    setFilters({ ...filters, search: debouncedSearchInputValue, page: 1 })
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
          {section.type === Enum_Componentsectionsarticlelisting_Type.Press ? (
            <ArticlePressCategoriesSelect onCategoryChange={handleCategoryChange} />
          ) : null}
          {section.type === Enum_Componentsectionsarticlelisting_Type.News ? (
            <ArticleNewsCategoriesSelect onCategoryChange={handleCategoryChange} />
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
        <DataWrapper filters={filters} onPageChange={handlePageChange} section={section} />
      </div>
    </Section>
  )
}

export default ArticleListing
