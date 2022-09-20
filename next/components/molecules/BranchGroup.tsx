import { useTranslation } from 'next-i18next'
import { useContext, useMemo } from 'react'

import { BranchGroupFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import { NavigationContext } from '../layouts/NavigationProvider'
import Row from './Row/Row'

const BranchGroup = ({ branches }: BranchGroupFragment) => {
  const { i18n } = useTranslation()
  const { navMap } = useContext(NavigationContext)

  const filteredBranches = useMemo(() => {
    return (branches ?? []).map((branch) => branch?.branch?.data?.attributes).filter(isDefined)
  }, [branches])

  return (
    <div className="flex flex-col gap-4">
      {filteredBranches?.map(({ title, slug, address }) => (
        <Row
          key={slug}
          title={title}
          address={address}
          linkHref={`${navMap.get(i18n.language === 'en' ? 'contacts' : 'kontakty') ?? ''}/${slug}`}
        />
      ))}
    </div>
  )
}

export default BranchGroup
