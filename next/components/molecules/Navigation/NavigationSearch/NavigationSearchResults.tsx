import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { MeilisearchResultType } from '../../../../utils/types'
import MLink from '../../../atoms/MLink'
import Spinner from '../../../atoms/Spinner'

type NavigationSearchResultsProps = {
  searchQuery: string
  results: MeilisearchResultType<string>[]
  isLoading: boolean
}

const NavigationSearchResults = ({
  searchQuery,
  results,
  isLoading,
}: NavigationSearchResultsProps) => {
  const { t } = useTranslation('common', {
    keyPrefix: 'components.molecules.Navigation.NavigationSearch',
  })
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

  return isLoading ? (
    <div className="flex flex-col items-center justify-center py-4 text-primary">
      <motion.div animate={{ scale: 1 }} initial={{ scale: 0 }}>
        <Spinner className="h-8 w-8" />
      </motion.div>
    </div>
  ) : results.length > 0 ? (
    <div className="flex flex-col py-2">
      {results.map(({ slug, title, index }) => (
        <MLink
          noStyles
          // eslint-disable-next-line sonarjs/no-nested-template-literals, @typescript-eslint/restrict-template-expressions
          href={`${indexToPathName[index]}/${slug ?? ''}`}
          key={`${index}-${slug}`}
          className="px-4 py-2 text-[14px]"
        >
          {title}
        </MLink>
      ))}
      <MLink className="!justify-start px-4 py-2" href={`/search?query=${searchQuery}`}>
        {t('allResults')}
      </MLink>
    </div>
  ) : null
}

export default NavigationSearchResults
