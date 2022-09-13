/* eslint-disable sonarjs/no-duplicate-string */
import 'react-loading-skeleton/dist/skeleton.css'

import { motion } from 'framer-motion'
import { GetStaticProps, GetStaticPropsResult } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useCallback, useMemo, useState } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'

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
import { useMeilisearch } from '../hooks/useMeilisearch'
import { client } from '../utils/gql'

const COUNT_PER_PAGE = 10

type SearchResultsProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
}

const SearchResults = ({ navigation, general }: SearchResultsProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'pages.search' })

  const hostname =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin.replace(/https?:\/\//g, '')
      : ''

  const [areBranchesSelected, setBranchesSelected] = useState(false)
  const [areDocumentsSelected, setDocumentsSelected] = useState(false)
  const [arePagesSelected, setPagesSelected] = useState(false)
  const [areArticlesSelected, setArticlesSelected] = useState(false)

  const isNothingSelected = useMemo(() => {
    return (
      !areBranchesSelected && !areDocumentsSelected && !arePagesSelected && !areArticlesSelected
    )
  }, [areArticlesSelected, areBranchesSelected, areDocumentsSelected, arePagesSelected])

  const deselectAll = useCallback(() => {
    setBranchesSelected(false)
    setDocumentsSelected(false)
    setPagesSelected(false)
    setArticlesSelected(false)
  }, [])

  const indexes = useMemo(() => {
    const result = []
    if (areBranchesSelected) result.push('branch')
    if (areDocumentsSelected) result.push('document')
    if (arePagesSelected) result.push('page')
    if (areArticlesSelected) result.push('article')
    return result.length > 0 ? result : ['branch', 'document', 'page', 'article']
  }, [areBranchesSelected, areDocumentsSelected, arePagesSelected, areArticlesSelected])

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
  })

  return (
    <PageWrapper navigation={navigation} general={general}>
      <SectionsWrapper isContainer>
        <Section title="Výsledky vyhľadávania">
          <div className="flex flex-col gap-6">
            <Search isLarge value={searchQuery ?? ''} onChange={setSearchQuery} />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TagToggle isSelected={isNothingSelected} onChange={deselectAll}>
                  Všetky výsledky
                </TagToggle>
                <TagToggle isSelected={arePagesSelected} onChange={setPagesSelected}>
                  Stránka
                </TagToggle>
                <TagToggle isSelected={areDocumentsSelected} onChange={setDocumentsSelected}>
                  Súbor
                </TagToggle>
                <TagToggle isSelected={areArticlesSelected} onChange={setArticlesSelected}>
                  Článok
                </TagToggle>
                <TagToggle isSelected={areBranchesSelected} onChange={setBranchesSelected}>
                  Cintorín/Pobočka
                </TagToggle>
              </div>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <div>Bolo nájdených {totalResultsCount} výsledkov</div>
              )}
            </div>

            {
              <div className="flex flex-col gap-6">
                <AnimateHeight isVisible>
                  {isLoading ? (
                    <SkeletonTheme baseColor="#d4d4d4" highlightColor="#e9e9e9">
                      <div className="flex select-none flex-col gap-3">
                        {Array.from({ length: COUNT_PER_PAGE }, (_item, index) => (
                          <RowSkeleton key={index} />
                        ))}
                      </div>
                    </SkeletonTheme>
                  ) : totalResultsCount === 0 ? (
                    <motion.div
                      initial={{ y: 16 }}
                      animate={{ y: 0 }}
                      className="flex justify-center text-lg"
                    >
                      Nebol nájdený žiaden výsledok
                    </motion.div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {results.map(({ title, index, slug, id }) => (
                        <Row
                          key={`${index}-${slug ?? id ?? ''}`}
                          title={title}
                          // eslint-disable-next-line sonarjs/no-nested-template-literals
                          link={`${hostname}${t(`paths.${index}`)}/${slug ?? id ?? ''}`}
                          showUrl
                          tags={[index]}
                        />
                      ))}
                    </div>
                  )}
                </AnimateHeight>
                <div className="flex justify-end">
                  <Pagination onChange={changePage} count={pageCount} selectedPage={currentPage} />
                </div>
              </div>
            }
          </div>
        </Section>
      </SectionsWrapper>
    </PageWrapper>
  )
}

export const getStaticProps: GetStaticProps = async ({
  locale = 'sk',
}): Promise<GetStaticPropsResult<SearchResultsProps>> => {
  const [{ navigation, general }, translations] = await Promise.all([
    client.General({ locale }),
    serverSideTranslations(locale, ['common']),
  ])

  const filteredNavigation = navigation.filter(Boolean) as NavigationItemFragment[]

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
