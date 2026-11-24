import { CategoryCard } from '@/components/molecules/Cards/CategoryFaqThemeCard'
import Section, { SectionProps } from '@/components/molecules/Section'
import { MenuListingFragment } from '@/graphql'
import { useNavigation } from '@/services/navigation/NavigationProvider'

type MenuListingSectionProps = Pick<SectionProps, 'background'> & {
  section: MenuListingFragment
}

const MenuListingSection = ({ section, ...rest }: MenuListingSectionProps) => {
  const { slug, title } = section
  const { getChildren } = useNavigation()

  // `slug` holds the path of the page whose subpages are listed, e.g. `/sluzby/hrobove-miesto`.
  const subpages = getChildren(slug)

  return (
    <Section title={title} cardGrid="cards" {...rest}>
      {subpages.map((subpage) => (
        <CategoryCard key={subpage.slug} title={subpage.title} linkHref={subpage.path} />
      ))}
    </Section>
  )
}

export default MenuListingSection
