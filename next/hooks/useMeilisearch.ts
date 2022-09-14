import { useTranslation } from 'next-i18next'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDebounce } from 'usehooks-ts'

import { braidArrays } from '../utils/braidArrays'
import { meiliClient } from '../utils/meilisearch'
import { MeilisearchResultType } from '../utils/types'

export type UseMeilisearchOptions<T extends string> = {
  indexes?: {
    name: T
    localized?: boolean
  }[]
  countPerPage?: number
}

export const useMeilisearch = <T extends string>({
  indexes = [],
  countPerPage = 10,
}: UseMeilisearchOptions<T>) => {
  const {
    i18n: { language },
  } = useTranslation()

  const [isLoading, setLoading] = useState<boolean>(false)

  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const debouncedSearchQuery = useDebounce(searchQuery, 1000)

  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [allResults, setAllResults] = useState<MeilisearchResultType<T>[]>([])
  const [totalResultsCount, setTotalResultsCount] = useState(0)

  // on first render set searchQuery according to urlQuery
  useEffect(() => {
    const urlSearchQuery = new URLSearchParams(window.location.search).get('query')
    if (urlSearchQuery) {
      setSearchQuery(urlSearchQuery)
    }
  }, [])

  // set urlQuery according to searchQuery to keep them in sync
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    if (searchQuery !== null) {
      if (searchQuery) {
        queryParams.set('query', searchQuery)
      } else {
        queryParams.delete('query')
      }
    }

    let stringParams = queryParams.toString()
    stringParams = stringParams ? `?${stringParams}` : ''

    window.history.replaceState({}, '', `${window.location.pathname}${stringParams}`)
  }, [searchQuery])

  const changePage = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  useEffect(() => {
    // when searchQuery changes, set loading
    setLoading(true)
    // make sure to turn off loading after some time when debouncedSearchQuery doesn't change
    // (so when you start typing, but you get back to same value using backspaces)
    const timeout = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timeout)
  }, [searchQuery])

  useEffect(() => {
    changePage(1)

    // fetch and braid arrays together
    const fetchResults = async () =>
      braidArrays(
        ...(await Promise.all(
          indexes.map((index) =>
            meiliClient
              .index(index.name)
              .search<MeilisearchResultType<T>>(debouncedSearchQuery ?? '*', {
                limit: 1000,
                filter: index.localized ? [`locale = ${language ?? 'sk'}`] : [],
              })
              .then((results) => {
                return results.hits.map((hit) => ({ ...hit, index: index.name }))
              }),
          ),
        )),
      )

    fetchResults()
      .then((braidResults) => {
        setAllResults(braidResults)
        setTotalResultsCount(braidResults.length)
        setPageCount(Math.ceil(braidResults.length / countPerPage))
        setLoading(false)
        return braidResults
      })
      .catch((error) => {
        // TODO: handle errors better way :)
        // eslint-disable-next-line no-console
        console.error(error)
      })
  }, [indexes, debouncedSearchQuery, countPerPage, changePage, language])

  const results = useMemo(() => {
    const fromIndex = countPerPage * (currentPage - 1)
    const toIndex = countPerPage * currentPage
    return allResults.slice(fromIndex, toIndex)
  }, [allResults, countPerPage, currentPage])

  return {
    searchQuery,
    setSearchQuery,
    results,
    totalResultsCount,
    currentPage,
    changePage,
    pageCount,
    isLoading,
  }
}
