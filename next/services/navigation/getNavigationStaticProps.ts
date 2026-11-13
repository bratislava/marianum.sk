import { fetchNavigation } from '@/services/navigation/fetchNavigation'
import { navigationConfig } from '@/services/navigation/navigationConfig'
import { NavigationStaticProps, RouteEntity } from '@/services/navigation/typesNavigation'

/**
 * Use in getStaticProps or getServerSideProps and return the result as `navigationStaticProps`, `_app` provides it to
 * `useNavigation`.
 */
export const getNavigationStaticProps = async ({
  locale,
  currentEntity,
}: {
  locale: string
  currentEntity?: RouteEntity
}): Promise<NavigationStaticProps> => {
  const navigation = await fetchNavigation(navigationConfig)

  // Using null to make the object serializable
  return {
    navigation,
    locale,
    currentEntity: currentEntity ?? null,
  }
}
