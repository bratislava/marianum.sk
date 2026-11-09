import { ReactNode } from 'react'

import { CtaButtonFragment } from '@/graphql'
import { useNavigation } from '@/services/navigation/NavigationProvider'

/**
 * Based on olo.sk: https://github.com/bratislava/olo.sk/blob/master/next/src/utils/useGetLinkProps.ts
 */

// TODO: add analytics props as they are in https://github.com/bratislava/olo.sk/blob/master/next/src/utils/useGetLinkProps.ts
export type LinkProps = {
  children: ReactNode
  href: string
  target?: '_blank' | '_self'
}

export const useGetLinkProps = () => {
  const { getPathForStrapiEntity } = useNavigation()

  //  label from different link types is left here for consistency, to have same useGetLinkProps as in other projects, mainly olo.sk
  //  but in this case content admins are used to use label from button itself
  const getLinkProps = (
    link: CtaButtonFragment | null | undefined,
    // eslint-disable-next-line sonarjs/cognitive-complexity
  ) => {
    let href = '#'
    let label = link?.label ?? ''
    let target: '_blank' | '_self' | undefined

    if (!link) {
      return { label, href } // TODO
    }

    if ('page' in link && link.page?.data?.attributes) {
      href = getPathForStrapiEntity(link.page.data) ?? '#'
      // label = link.label ?? link.page.data.attributes.title
    } else if ('article' in link && link.article?.data?.attributes) {
      href = getPathForStrapiEntity(link.article.data) ?? '#'
      // label = link.label ?? link.article.data.attributes.title
    } else if ('branch' in link && link.branch?.data?.attributes) {
      href = getPathForStrapiEntity(link.branch.data) ?? '#'
      // label = link.label ?? link.branch.data.attributes.title
    } else if ('asset' in link && link.asset?.data?.attributes) {
      href = getPathForStrapiEntity(link.asset.data) ?? '#'
      // label = link.label ?? link.asset.data.attributes.title
    } else if ('bundle' in link && link.bundle?.data?.attributes) {
      href = getPathForStrapiEntity(link.bundle.data) ?? '#'
      // label = link.label ?? link.bundle.data.attributes.title
    } else if ('cemetery' in link && link.cemetery?.data?.attributes) {
      href = getPathForStrapiEntity(link.cemetery.data) ?? '#'
      // label = link.label ?? link.cemetery.data.attributes.title
    } else if ('managedObject' in link && link.managedObject?.data?.attributes) {
      // label = link.label ?? link.managedObject.data.attributes.title
      href = getPathForStrapiEntity(link.managedObject.data) ?? '#'
    } else if (link?.url) {
      label = link.label ?? link.url
      href = link.url
      target = href.startsWith('http') ? '_blank' : '_self'
    }

    return { label, href, target }
  }

  return { getLinkProps }
}
