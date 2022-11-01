import { useContext, useMemo } from 'react'

import { BranchGroupFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import RichText from '../atoms/RichText/RichText'
import { NavigationContext } from './Navigation/NavigationProvider/NavigationProvider'
import { useGetFullPath } from './Navigation/NavigationProvider/useGetFullPath'
import Row from './Row/Row'

const BranchGroup = ({ branches, showOpeningHours }: BranchGroupFragment) => {
  const { general } = useContext(NavigationContext)
  const { getFullPath } = useGetFullPath()

  const filteredBranches = useMemo(() => {
    return (branches ?? []).map((branch) => branch?.branch?.data).filter(isDefined)
  }, [branches])

  return (
    <div className="flex flex-col gap-4">
      {filteredBranches?.map((branch) => {
        const { title, slug, address } = branch.attributes ?? {}
        return (
          <Row
            key={slug}
            title={title ?? ''}
            address={address}
            linkHref={getFullPath(branch) ?? ''}
            moreContent={
              showOpeningHours ? <RichText content={general?.generalOpeningHours} /> : undefined
            }
          />
        )
      })}
    </div>
  )
}

export default BranchGroup
