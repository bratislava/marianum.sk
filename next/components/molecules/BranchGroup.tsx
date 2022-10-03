import { useTranslation } from 'next-i18next'
import { useContext, useMemo } from 'react'

import { BranchGroupFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import RichText from '../atoms/RichText/RichText'
import { NavigationContext } from '../layouts/NavigationProvider'
import Row from './Row/Row'

const BranchGroup = ({ branches, showOpeningHours }: BranchGroupFragment) => {
  const { t } = useTranslation()
  const { general } = useContext(NavigationContext)

  const filteredBranches = useMemo(() => {
    return (branches ?? []).map((branch) => branch?.branch?.data?.attributes).filter(isDefined)
  }, [branches])

  return (
    <div className="flex flex-col gap-4">
      {filteredBranches?.map(({ title, slug, address, openingHoursOverride }) => (
        <Row
          key={slug}
          title={title}
          address={address}
          linkHref={`${t('paths.contacts')}/${slug}`}
          moreContent={
            showOpeningHours ? (
              <RichText data={openingHoursOverride || general?.generalOpeningHours} />
            ) : undefined
          }
        />
      ))}
    </div>
  )
}

export default BranchGroup
