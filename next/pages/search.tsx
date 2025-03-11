import { motion } from 'framer-motion'
import { GetStaticProps, GetStaticPropsResult } from 'next'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useCallback, useRef, useState } from 'react'

import { AnimateHeight } from '@/components/atoms/AnimateHeight'
import TagToggle from '@/components/atoms/TagToggle'
import PageWrapper from '@/components/layouts/PageWrapper'
import SectionsWrapper from '@/components/layouts/SectionsWrapper'
import PaginationMeili from '@/components/molecules/PaginationMeili'
import Row from '@/components/molecules/Row/Row'
import RowSkeleton from '@/components/molecules/Row/RowSkeleton'
import Search from '@/components/molecules/Search'
import Section from '@/components/molecules/Section'
import { GeneralEntityFragment, NavigationItemFragment } from '@/graphql'
import { client } from '@/services/graphql/gqlClient'
import { isDefined } from '@/utils/isDefined'
import { useScrollToViewIfDataChange } from '@/utils/useScrollToViewIfDataChange'
import { allSearchTypes, SearchFilters, SearchType, useSearch } from '@/utils/useSearch'

const SearchSection = () => {
  const { t } = useTranslation()

  const translationMap = {
    page: t('SearchPage.tags.page'),
    article: t('SearchPage.tags.article'),
    branch: t('SearchPage.tags.branch'),
    bundle: t('SearchPage.tags.bundle'),
    cemetery: t('SearchPage.tags.cemetery'),
    document: t('SearchPage.tags.document'),
  } satisfies Record<SearchType, string>

  const [filters, setFilters] = useState<SearchFilters>({
    pageSize: 10,
    page: 1,
    selectedTypes: [],
  })

  const isNothingSelected = filters.selectedTypes.length === 0

  const deselectAll = useCallback(() => {
    setFilters({ ...filters, selectedTypes: [], page: 1 })
  }, [filters])

  const isTypeSelected = useCallback(
    (type: SearchType) => {
      return filters.selectedTypes.includes(type)
    },
    [filters],
  )

  const changeTypeSelected = useCallback(
    (changedType: SearchType) => {
      return (value: boolean) => {
        const newSelectedTypes = value
          ? [...filters.selectedTypes, changedType]
          : filters.selectedTypes.filter((type) => type !== changedType)

        setFilters({ ...filters, selectedTypes: newSelectedTypes })
      }
    },
    [filters],
  )

  const {
    searchQuery,
    setSearchQuery,
    dataToDisplay,
    delayedLoading,
    loadingAndNoDataToDisplay,
    emptySearchQuery,
  } = useSearch({ filters, isSyncedWithUrlQuery: true })

  const handleChangePage = (page: number) => {
    setFilters({ ...filters, page })
  }

  const h1Ref = useRef<HTMLHeadingElement>(null)
  useScrollToViewIfDataChange(dataToDisplay, filters, h1Ref)

  return (
    <Section>
      <div className="flex flex-col gap-3 md:gap-6">
        <h1 ref={h1Ref}>{t('SearchPage.searchResults')}</h1>
        <div className="hidden md:block">
          <Search isLarge value={searchQuery ?? ''} onSearchQueryChange={setSearchQuery} />
        </div>
        <div className="md:hidden">
          <Search value={searchQuery ?? ''} onSearchQueryChange={setSearchQuery} />
        </div>
        <div className="flex flex-col-reverse justify-between gap-3 md:flex-row md:items-center">
          <div className="-m-2 flex w-full items-center gap-3 overflow-auto p-2 pb-3 sm:pb-2 md:overflow-visible">
            <TagToggle isSelected={isNothingSelected} onChange={deselectAll}>
              {t('SearchPage.allResults')}
            </TagToggle>
            {allSearchTypes.map((type) => {
              return (
                <TagToggle
                  isSelected={isTypeSelected(type)}
                  onChange={changeTypeSelected(type)}
                  key={type}
                >
                  {t(`SearchPage.tags.${type}`)}
                </TagToggle>
              )
            })}
          </div>
          {!loadingAndNoDataToDisplay && !emptySearchQuery && (
            <div className="whitespace-nowrap">
              {t('SearchPage.resultsFound', { count: dataToDisplay?.estimatedTotalHits ?? 0 })}
            </div>
          )}
        </div>

        {!emptySearchQuery && (
          <div className="flex flex-col gap-6">
            <AnimateHeight isVisible>
              {delayedLoading || loadingAndNoDataToDisplay ? (
                <div className="flex select-none flex-col gap-3">
                  {Array.from({ length: filters.pageSize }, (_item, index) => (
                    <RowSkeleton key={index} />
                  ))}
                </div>
              ) : dataToDisplay?.estimatedTotalHits === 0 ? (
                <motion.div
                  initial={{ y: 48 }}
                  animate={{ y: 0 }}
                  className="flex justify-center py-8 text-lg"
                >
                  {t('SearchPage.resultsFound', { count: 0 })}
                </motion.div>
              ) : (
                <div className="flex flex-col gap-3">
                  {dataToDisplay?.hits.map(({ title, link, type }, index) => (
                    <Row
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      title={title}
                      linkHref={link}
                      showUrl
                      tags={[translationMap[type]]}
                      border={false}
                    />
                  ))}
                </div>
              )}
            </AnimateHeight>
            {dataToDisplay?.estimatedTotalHits !== 0 && (
              <div className="flex justify-center">
                <PaginationMeili
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  data={dataToDisplay!}
                  selectedPage={filters.page}
                  pageSize={filters.pageSize}
                  onPageChange={handleChangePage}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </Section>
  )
}

type SearchPageProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
}

const SearchPage = ({ navigation, general }: SearchPageProps) => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{`${t('SearchPage.pageTitle')} – Marianum`}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <PageWrapper navigation={navigation} general={general}>
        <SectionsWrapper alternateBackground className="pb-14">
          <SearchSection />
        </SectionsWrapper>
      </PageWrapper>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({
  locale = 'sk',
}): Promise<GetStaticPropsResult<SearchPageProps>> => {
  const [{ navigation, general }, translations] = await Promise.all([
    client.General({ locale }),
    serverSideTranslations(locale),
  ])

  const filteredNavigation = navigation.filter(isDefined)

  return {
    props: {
      navigation: filteredNavigation,
      general: general?.data ?? null,
      ...translations,
    },
    revalidate: 10,
  }
}

export default SearchPage
