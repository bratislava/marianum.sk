import { useMemo } from 'react'

import Row from '@/components/molecules/Row/Row'
import { BranchGroupFragment } from '@/graphql'
import { useNavigation } from '@/services/navigation/NavigationProvider'
import { isDefined } from '@/utils/isDefined'

const BranchGroup = ({ branches }: BranchGroupFragment) => {
  const { getPathForStrapiEntity } = useNavigation()

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
            linkHref={getPathForStrapiEntity(branch) ?? ''}
            tags={offices?.data.map((office) => office?.attributes?.title).filter(isDefined)}
            tagsPosition="under"
          />
        )
      })}
    </div>
  )
}

export default BranchGroup
