import MLink from '@/components/atoms/MLink'
import { useNavigation } from '@/services/navigation/NavigationProvider'

const CemeteryLink = ({ slug, title }: { slug: string; title: string | undefined }) => {
  const { getPathForMeiliEntity } = useNavigation()

  return (
    <MLink href={getPathForMeiliEntity('cemetery', { slug }) ?? ''} noStyles className="underline">
      {title}
    </MLink>
  )
}

export default CemeteryLink
