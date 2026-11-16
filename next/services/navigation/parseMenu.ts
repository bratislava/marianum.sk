import { MenuEntityFragment, MenuLinkFragment } from '@/graphql'
import { getEntityForStrapiEntity } from '@/services/navigation/getPathForEntity'
import { MenuNodeData } from '@/services/navigation/typesNavigation'
import { isDefined } from '@/utils/isDefined'

// Inspired by olo.sk:
// https://github.com/bratislava/olo.sk/blob/master/next/src/components/common/NavBar/NavMenu/getParsedMenus.ts

/**
 * Where a menu link leads: a linked entity wins over `url`, the same as in `useGetLinkProps`. `title` is the title of
 * the linked entity.
 */
const getLinkTarget = (link: MenuLinkFragment | null | undefined) => {
  const strapiEntity =
    link?.page?.data ??
    link?.article?.data ??
    link?.branch?.data ??
    link?.asset?.data ??
    link?.bundle?.data ??
    link?.cemetery?.data ??
    link?.managedObject?.data
  const entity = getEntityForStrapiEntity(strapiEntity)

  return entity
    ? { entity, url: null, title: strapiEntity?.attributes?.title ?? null }
    : { entity: null, url: link?.url || null, title: null }
}

/** Something that leads nowhere and has nothing below it is not worth showing. */
const hasTargetOrChildren = ({ entity, url, children }: MenuNodeData) =>
  Boolean(entity || url) || children.length > 0

/**
 * Parses the Menu single type (menu items > sections > links) into a tree of plain serializable nodes, small enough to
 * be sent in the props of every page. Paths are resolved later, see `menu` in `NavigationProvider`.
 *
 * A link without a label shows the title of the entity it links to. Links that lead nowhere are left out, e.g. links
 * to unpublished pages, which Strapi returns empty.
 */
export const parseMenu = (
  menu: MenuEntityFragment | null | undefined,
): { menu: MenuNodeData[] } => {
  const parseLink = (link: MenuLinkFragment): MenuNodeData | null => {
    const { entity, url, title } = getLinkTarget(link)
    const label = link.label || title || url

    return label && (entity || url) ? { label, entity, url, children: [] } : null
  }

  const menuItems = menu?.attributes?.menuItems?.filter(isDefined) ?? []

  return {
    menu: menuItems
      .map((menuItem): MenuNodeData => {
        const { entity, url } = getLinkTarget(menuItem.seeAllLink)
        const sections = menuItem.sections?.filter(isDefined) ?? []

        return {
          label: menuItem.label,
          entity,
          url,
          children: sections
            .map((section): MenuNodeData => {
              const sectionTarget = getLinkTarget(section.link)
              const links = section.links?.filter(isDefined) ?? []

              return {
                label: section.label,
                entity: sectionTarget.entity,
                url: sectionTarget.url,
                children: links.map(parseLink).filter(isDefined),
              }
            })
            .filter(hasTargetOrChildren),
        }
      })
      .filter(hasTargetOrChildren),
  }
}
