import { Enum_Branch_Type } from '../../graphql'
import MLink from '../atoms/MLink'
import { useGetFullPathMeili } from './Navigation/NavigationProvider/useGetFullPath'

const BranchLink = ({ slug, title }: { slug: string; title: string | undefined }) => {
  const { getFullPathMeili } = useGetFullPathMeili()

  return (
    <MLink
      href={getFullPathMeili('branch', { type: Enum_Branch_Type.Cintorin, slug }) ?? ''}
      noStyles
      className="underline"
    >
      {title}
    </MLink>
  )
}

export default BranchLink
