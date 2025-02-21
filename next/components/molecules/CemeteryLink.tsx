import MLink from '@/components/atoms/MLink'
import { useGetFullPathMeili } from '@/components/molecules/Navigation/NavigationProvider/useGetFullPath'

const CemeteryLink = ({ slug, title }: { slug: string; title: string | undefined }) => {
  const { getFullPathMeili } = useGetFullPathMeili()

  return (
    <MLink href={getFullPathMeili('cemetery', { slug }) ?? ''} noStyles className="underline">
      {title}
    </MLink>
  )
}

export default CemeteryLink
