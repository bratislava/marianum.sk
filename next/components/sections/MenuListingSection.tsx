import { NavigationItemFragment } from '../../graphql'
import { getSlugsForNavFiltering } from '../../utils/getSlugsForNavFiltering'
import { CategoryCard } from '../molecules/Cards/CategoryFaqThemeCard'
import Section, { SectionProps } from '../molecules/Section'

type MenuListingSectionProps = Pick<SectionProps, 'title' | 'isContainer' | 'color'> & {
  slug: string | null | undefined
  navigation: NavigationItemFragment[]
}

const MenuListingSection = ({
  title,
  slug,
  navigation,
  isContainer,
  color,
}: MenuListingSectionProps) => {
  const slugs = getSlugsForNavFiltering(slug)

  let desiredChild: NavigationItemFragment | null = null
  if (slugs.length > 0) {
    desiredChild = navigation.find((navItem) => navItem.path === slugs[0]) || null
  }
  if (slugs.length > 1) {
    desiredChild = desiredChild?.items?.find((navItem) => navItem?.path === slugs[1]) || null
  }

  return (
    <Section title={title} isContainer={isContainer} color={color} cardGrid>
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
