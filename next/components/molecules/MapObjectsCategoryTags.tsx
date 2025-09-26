import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'

import TagToggle from '@/components/atoms/TagToggle'

export type TagProps = {
  title: string
  slug: string
  key: string
}
type MapObjectsCategoryTagsProps = {
  queryKey: string[]
  fetcher: () => Promise<TagProps[]>
  toggleSelectedCategory: (category: string) => void
  selectedCategories: Record<string, boolean>
}

const MapObjectsCategoryTags = ({
  queryKey,
  fetcher,
  toggleSelectedCategory,
  selectedCategories,
}: MapObjectsCategoryTagsProps) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: [queryKey],
    queryFn: fetcher,
    placeholderData: keepPreviousData,
  })

  const { t } = useTranslation()

  // TODO replace by proper error
  if (isError) {
    return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  }

  const options = isPending ? [] : [...data]

  return (
    <ul aria-label={t('MapSection.filtering')} className="flex flex-wrap gap-2">
      {options.map((option) => {
        return (
          <li key={option.key}>
            <TagToggle
              isSelected={selectedCategories[option.slug]}
              onChange={() => toggleSelectedCategory(option.slug)}
            >
              {option.title}
            </TagToggle>
          </li>
        )
      })}
    </ul>
  )
}

export default MapObjectsCategoryTags
