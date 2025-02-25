import { useMemo } from 'react'

import { useGetFullPath } from '@/components/molecules/Navigation/NavigationProvider/useGetFullPath'
import Row from '@/components/molecules/Row/Row'
import { BranchGroupFragment } from '@/graphql'
import { isDefined } from '@/utils/isDefined'

const BranchGroup = ({ branches }: BranchGroupFragment) => {
  const { getFullPath } = useGetFullPath()

  const filteredBranches = useMemo(() => {
    return (branches ?? []).map((branch) => branch?.branch?.data).filter(isDefined)
  }, [branches])

  return (
    <div className="flex flex-col gap-4">
      {filteredBranches?.map((branch) => {
        const { title, slug, address, offices } = branch.attributes ?? {}

        return (
          <Row
            key={slug}
            title={title ?? ''}
            address={address}
            linkHref={getFullPath(branch) ?? ''}
            tags={offices?.data.map((office) => office?.attributes?.title).filter(isDefined)}
            tagsPosition="under"
          />
        )
      })}
    </div>
  )
}

export default BranchGroup
