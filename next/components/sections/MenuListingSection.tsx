import { NavigationItemFragment } from '../../graphql'
import { getSlugsForNavFiltering } from '../../utils/getSlugsForNavFiltering'
import { CategoryCard } from '../molecules/Cards/CategoryFaqThemeCard'
import Section from '../molecules/Section'

type MenuListingSectionProps = {
  title: string | null | undefined
  slug: string | null | undefined
  navigation: NavigationItemFragment[]
  isFullWidth: boolean
}

const MenuListingSection = ({ title, slug, navigation, isFullWidth }: MenuListingSectionProps) => {
  const slugs = getSlugsForNavFiltering(slug)

  let desiredChild: NavigationItemFragment | null = null
  if (slugs.length > 0) {
    desiredChild = navigation.find((navItem) => navItem.path === slugs[0]) || null
  }
  if (slugs.length > 1) {
    desiredChild = desiredChild?.items?.find((navItem) => navItem?.path === slugs[1]) || null
  }

  return (
    <Section title={title} fullWidth={isFullWidth} cardGrid>
      {desiredChild?.items?.map((subItem) => (
        <CategoryCard
          key={subItem?.path}
          title={subItem?.title ?? ''}
          linkHref={subItem?.path ?? ''}
        />
      ))}
    </Section>
  )
}

export default MenuListingSection