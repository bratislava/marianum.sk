import { useMemo } from 'react'

import { BranchGroupFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import Row from './Row'

const BranchGroup = ({ branches }: BranchGroupFragment) => {
  const filteredBranches = useMemo(() => {
    return (branches ?? []).map((branch) => branch?.branch?.data?.attributes).filter(isDefined)
  }, [branches])
  return (
    <div className="flex flex-col gap-4">
      {filteredBranches?.map(({ title, slug, address }) => (
        <Row title={title} address={address} link={slug} />
      ))}
    </div>
  )
}

export default BranchGroup
