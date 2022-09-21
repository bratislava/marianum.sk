import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { BranchGroupFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import Row from './Row/Row'

const BranchGroup = ({ branches }: BranchGroupFragment) => {
  const { t } = useTranslation()

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
          linkHref={`${t('paths.contacts')}/${slug}`}
        />
      ))}
    </div>
  )
}

export default BranchGroup
