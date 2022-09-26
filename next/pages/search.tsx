import { motion } from 'framer-motion'
import { GetStaticProps, GetStaticPropsResult } from 'next'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useCallback, useMemo, useState } from 'react'

import { AnimateHeight } from '../components/atoms/AnimateHeight'
import Pagination from '../components/atoms/Pagination/Pagination'
import TagToggle from '../components/atoms/TagToggle'
import PageWrapper from '../components/layouts/PageWrapper'
import SectionsWrapper from '../components/layouts/SectionsWrapper'
import Row from '../components/molecules/Row/Row'
import RowSkeleton from '../components/molecules/Row/RowSkeleton'
import Search from '../components/molecules/Search'
import Section from '../components/molecules/Section'
import { GeneralEntityFragment, NavigationItemFragment } from '../graphql'
import { IndexConfig, useMeilisearch } from '../hooks/useMeilisearch'
import { client } from '../utils/gql'
import { isDefined } from '../utils/isDefined'

const COUNT_PER_PAGE = 24

type SearchResultsProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
}

const branchIndexConfig: IndexConfig = { name: 'branch', localized: true }
const documentIndexConfig: IndexConfig = { name: 'document', localized: false }
const pageIndexConfig: IndexConfig = { name: 'page', localized: true }
const bundleIndexConfig: IndexConfig = { name: 'bundle', localized: true }
const articleIndexConfig: IndexConfig = { name: 'article', localized: true }

const SearchResults = ({ navigation, general }: SearchResultsProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'pages.search' })
  const { t: pathsT } = useTranslation('common', { keyPrefix: 'paths' })

  const indexToPathName: { [key: string]: string } = useMemo(
    () => ({
      bundle: pathsT('bundles'),
      page: '',
      article: pathsT('news'),
      branch: pathsT('cemeteries'),
      document: pathsT('documents'),
    }),
    [pathsT],
  )

  const hostname =
    typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''

  const [areBranchesSelected, setBranchesSelected] = useState(false)
  const [areDocumentsSelected, setDocumentsSelected] = useState(false)
  const [arePagesSelected, setPagesSelected] = useState(false)
  const [areBundlesSelected, setBundlesSelected] = useState(false)
  const [areArticlesSelected, setArticlesSelected] = useState(false)

  const isNothingSelected = useMemo(() => {
    return (
      !areBranchesSelected &&
      !areDocumentsSelected &&
      !arePagesSelected &&
      !areBundlesSelected &&
      !areArticlesSelected
    )
  }, [
    areArticlesSelected,
    areBranchesSelected,
    areDocumentsSelected,
    areBundlesSelected,
    arePagesSelected,
  ])

  const deselectAll = useCallback(() => {
    setBranchesSelected(false)
    setDocumentsSelected(false)
    setPagesSelected(false)
    setBundlesSelected(false)
    setArticlesSelected(false)
  }, [])

  const indexes = useMemo(() => {
    const result = []
    if (areBranchesSelected) result.push(branchIndexConfig)
    if (areDocumentsSelected) result.push(documentIndexConfig)
    if (arePagesSelected) result.push(pageIndexConfig)
    if (areBundlesSelected) result.push(bundleIndexConfig)
    if (areArticlesSelected) result.push(articleIndexConfig)
    return result.length > 0
      ? // if something is selected
        result
      : // otherwise get it all
        [
          branchIndexConfig,
          documentIndexConfig,
          pageIndexConfig,
          bundleIndexConfig,
          articleIndexConfig,
        ]
  }, [
    areBranchesSelected,
    areDocumentsSelected,
    arePagesSelected,
    areArticlesSelected,
    areBundlesSelected,
  ])

  const {
    searchQuery,
    setSearchQuery,
    pageCount,
    changePage,
    currentPage,
    results,
    totalResultsCount,
    isLoading,
  } = useMeilisearch({
    indexes,
    countPerPage: COUNT_PER_PAGE,
    isSyncedWithUrlQuery: true,
  })

  return (
    <>
      <Head>
        <title>Vyhľadávanie - marianum.sk</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <PageWrapper navigation={navigation} general={general}>
        <SectionsWrapper alternateBackground>
          <Section>
            <div className="flex flex-col gap-3 md:gap-6">
              <h1>{t('searchResults')}</h1>
              <div className="hidden md:block">
                <Search
                  placeholder={t('search')}
                  isLarge
                  value={searchQuery ?? ''}
                  onSearchQueryChange={setSearchQuery}
                />
              </div>
              <div className="md:hidden">
                <Search
                  placeholder={t('search')}
                  value={searchQuery ?? ''}
                  onSearchQueryChange={setSearchQuery}
                />
              </div>
              <div className="flex flex-col-reverse justify-between gap-3 md:flex-row md:items-center">
                <div className="flex w-full items-center gap-3 overflow-auto">
                  <TagToggle isSelected={isNothingSelected} onChange={deselectAll}>
                    {t('tags.allResults')}
                  </TagToggle>
                  <TagToggle isSelected={areBundlesSelected} onChange={setBundlesSelected}>
                    {t('tags.bundle')}
                  </TagToggle>
                  <TagToggle isSelected={arePagesSelected} onChange={setPagesSelected}>
                    {t('tags.page')}
                  </TagToggle>
                  <TagToggle isSelected={areDocumentsSelected} onChange={setDocumentsSelected}>
                    {t('tags.document')}
                  </TagToggle>
                  <TagToggle isSelected={areArticlesSelected} onChange={setArticlesSelected}>
                    {t('tags.article')}
                  </TagToggle>
                  <TagToggle isSelected={areBranchesSelected} onChange={setBranchesSelected}>
                    {t('tags.branch')}
                  </TagToggle>
                </div>
                {!isLoading && (
                  <div className="whitespace-nowrap">
                    {t('resultsFound', { count: totalResultsCount })}
                  </div>
                )}
              </div>

              {
                <div className="flex flex-col gap-6">
                  <AnimateHeight isVisible>
                    {isLoading ? (
                      <div className="flex select-none flex-col gap-3">
                        {Array.from({ length: COUNT_PER_PAGE }, (_item, index) => (
                          <RowSkeleton key={index} />
                        ))}
                      </div>
                    ) : totalResultsCount === 0 ? (
                      <motion.div
                        initial={{ y: 48 }}
                        animate={{ y: 0 }}
                        className="flex justify-center py-8 text-lg"
                      >
                        {t('resultsFound', { count: 0 })}
                      </motion.div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {results.map(({ title, index, slug }) => (
                          <Row
                            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                            key={`${index}-${slug ?? ''}`}
                            title={title}
                            linkHref={`${hostname}${indexToPathName[index]}/${slug ?? ''}`}
                            showUrl
                            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                            tags={[t(`tags.${index}`)]}
                            border={false}
                          />
                        ))}
                      </div>
                    )}
                  </AnimateHeight>
                  {totalResultsCount !== 0 && (
                    <div className="flex justify-center md:justify-end">
                      <Pagination
                        onChange={changePage}
                        count={pageCount}
                        selectedPage={currentPage}
                      />
                    </div>
                  )}
                </div>
              }
            </div>
          </Section>
        </SectionsWrapper>
      </PageWrapper>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({
  locale = 'sk',
}): Promise<GetStaticPropsResult<SearchResultsProps>> => {
  const [{ navigation, general }, translations] = await Promise.all([
    client.General({ locale }),
    serverSideTranslations(locale, ['common']),
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

export default SearchResults
