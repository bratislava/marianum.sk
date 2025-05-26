import { CategoryCard } from '@/components/molecules/Cards/CategoryFaqThemeCard'
import { useNavigationContext } from '@/components/molecules/Navigation/NavigationProvider/useNavigationContext'
import Section, { SectionProps } from '@/components/molecules/Section'
import { MenuListingFragment, NavigationItemFragment } from '@/graphql'
import { getSlugsForNavFiltering } from '@/utils/getSlugsForNavFiltering'

type MenuListingSectionProps = Pick<SectionProps, 'background'> & {
  section: MenuListingFragment
}

const MenuListingSection = ({ section, ...rest }: MenuListingSectionProps) => {
  const { slug, title } = section
  const { navigation } = useNavigationContext()

  const slugs = getSlugsForNavFiltering(slug)

  let desiredChild: NavigationItemFragment | null = null
  if (slugs.length > 0) {
    desiredChild = navigation.find((navItem) => navItem.path === slugs[0]) || null
  }
  if (slugs.length > 1) {
    desiredChild = desiredChild?.items?.find((navItem) => navItem?.path === slugs[1]) || null
  }

  return (
    <Section title={title} cardGrid="cards" {...rest}>
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
