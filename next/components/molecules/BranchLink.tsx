import { Enum_Branch_Type } from '../../graphql'
import MLink from '../atoms/MLink'
import { useSlugMeili } from './Navigation/NavigationProvider/useFullSlug'

const BranchLink = ({ slug, title }: { slug: string; title: string | undefined }) => {
  const { getFullSlugMeili } = useSlugMeili()

  return (
    <MLink
      href={getFullSlugMeili('branch', { type: Enum_Branch_Type.Cintorin, slug }) ?? ''}
      noStyles
      className="underline"
    >
      {title}
    </MLink>
  )
}

export default BranchLink
