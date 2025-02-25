import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'

import MLink from '@/components/atoms/MLink'
import Spinner from '@/components/atoms/Spinner'
import { SearchData } from '@/utils/useSearch'

type NavigationSearchResultsProps = {
  searchQuery: string
  data: SearchData | undefined
  isLoading: boolean
}

const NavigationSearchResults = ({
  searchQuery,
  data,
  isLoading,
}: NavigationSearchResultsProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'NavigationSearch' })

  return isLoading ? (
    <div className="flex flex-col items-center justify-center py-4 text-primary">
      <motion.div animate={{ scale: 1 }} initial={{ scale: 0 }}>
        <Spinner className="size-8" />
      </motion.div>
    </div>
  ) : data && data.hits?.length > 0 ? (
    <div className="flex flex-col py-2">
      {data.hits.map(({ title, link }, index) => (
        <MLink
          noStyles
          href={link}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="px-4 py-2 text-[14px] hover:bg-primary/12 focus:bg-primary/12"
        >
          {title}
        </MLink>
      ))}
      <MLink
        className="!justify-start px-4 py-2 hover:bg-primary/12 focus:bg-primary/12"
        href={`/search?query=${searchQuery}`}
      >
        {t('allResults')}
      </MLink>
    </div>
  ) : null
}

export default NavigationSearchResults
