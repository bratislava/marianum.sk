import MLink from '../atoms/MLink'
import { useGetFullPathMeili } from './Navigation/NavigationProvider/useGetFullPath'

const CemeteryLink = ({ slug, title }: { slug: string; title: string | undefined }) => {
  const { getFullPathMeili } = useGetFullPathMeili()

  return (
    <MLink href={getFullPathMeili('cemetery', { slug }) ?? ''} noStyles className="underline">
      {title}
    </MLink>
  )
}

export default CemeteryLink
