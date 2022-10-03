import { useContext, useMemo } from 'react'

import { BranchGroupFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import { getFullPath } from '../../utils/localPaths'
import RichText from '../atoms/RichText/RichText'
import { NavigationContext } from '../layouts/NavigationProvider'
import Row from './Row/Row'

const BranchGroup = ({ branches, showOpeningHours }: BranchGroupFragment) => {
  const { general } = useContext(NavigationContext)

  const filteredBranches = useMemo(() => {
    return (branches ?? []).map((branch) => branch?.branch?.data).filter(isDefined)
  }, [branches])

  return (
    <div className="flex flex-col gap-4">
      {filteredBranches?.map((branch) => {
        const { title, slug, address, openingHoursOverride } = branch.attributes ?? {}
        return (
          <Row
            key={slug}
            title={title ?? ''}
            address={address}
            linkHref={getFullPath(branch) ?? ''}
            moreContent={
              showOpeningHours ? (
                <RichText data={openingHoursOverride || general?.generalOpeningHours} />
              ) : undefined
            }
          />
        )
      })}
    </div>
  )
}

export default BranchGroup
