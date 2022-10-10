import { SearchResponse } from 'meilisearch'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useState } from 'react'
import useSwr from 'swr'
import { useDebounce } from 'usehooks-ts'

import SearchIcon from '../../../assets/search.svg'
import { ArticleListingFragment, Enum_Componentsectionsarticlelisting_Type } from '../../../graphql'
import { ArticleMeili } from '../../../types/meiliTypes'
import { isDefined } from '../../../utils/isDefined'
import { meiliClient } from '../../../utils/meilisearch'
import useGetSwrExtras from '../../../utils/useGetSwrExtras'
import Pagination from '../../atoms/Pagination/Pagination'
import TextField from '../../atoms/TextField'
import ArticleCard from '../../molecules/Cards/ArticleCard'
import { useSlugMeili } from '../../molecules/Navigation/NavigationProvider/useFullSlug'
import Section from '../../molecules/Section'
import ArticleNewsCategoriesSelect from './ArticleNewsCategoriesSelect'
import ArticlePressCategoriesSelect from './ArticlePressCategoriesSelect'

const pageSize = 24

type Filters = {
  search: string
  categoryId: string | null
  page: number
}

const Articles = ({ data }: { data: SearchResponse<ArticleMeili> }) => {
  const { t } = useTranslation('common', {
    keyPrefix: 'components.ArticleListing',
  })
  const { getFullSlugMeili } = useSlugMeili()

  if (data.hits?.length > 0) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {data.hits.map((article) => {
          const { title, publishedAt, coverMedia, slug, newsCategory } = article

          return (
            <ArticleCard
              key={slug}
              title={title}
              image={coverMedia?.data?.attributes}
              date={publishedAt}
              linkHref={getFullSlugMeili('article', article) ?? ''}
              category={{ attributes: newsCategory }}
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
      sort: ['updatedAtTimestamp:desc'],
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

  const pageCount = dataToDisplay ? Math.ceil(dataToDisplay.estimatedTotalHits / pageSize) : 0
  return (
    <>
      {/* TODO: Use loading overlay with spinner */}
      {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion */}
      <Articles data={dataToDisplay!} />

      {description && <p className="pt-4 md:pt-6">{description}</p>}
      {pageCount > 0 && (
        <Pagination
          className="flex justify-center pt-4 md:pt-6"
          selectedPage={filters.page}
          count={pageCount}
          onChange={onPageChange}
        />
      )}
    </>
  )
}

type ArticleListingProps = {
  section: ArticleListingFragment
}

// TODO: Overlap with header
const ArticleListing = ({ section }: ArticleListingProps) => {
  const { t } = useTranslation()

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
      <div className="mb-4 grid grid-cols-1 gap-4 md:mb-6 md:grid-cols-3 md:bg-white md:p-6">
        <div>
          {section.type === Enum_Componentsectionsarticlelisting_Type.Press ? (
            <ArticlePressCategoriesSelect onCategoryChange={handleCategoryChange} />
          ) : null}
          {section.type === Enum_Componentsectionsarticlelisting_Type.News ? (
            <ArticleNewsCategoriesSelect onCategoryChange={handleCategoryChange} />
          ) : null}
        </div>
        <div className="md:col-span-2">
          <TextField
            id="with-text-left-icon"
            defaultValue={searchInputValue}
            leftSlot={
              <button type="button" className="p-2">
                <SearchIcon />
              </button>
            }
            placeholder={t('general.searchPlaceholder')}
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
        </div>
      </div>

      <div>
        <DataWrapper filters={filters} onPageChange={handlePageChange} section={section} />
      </div>
    </Section>
  )
}

export default ArticleListing
