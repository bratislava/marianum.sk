import { ReactNode } from 'react'

import { useGetFullPath } from '@/components/molecules/Navigation/NavigationProvider/useGetFullPath'
import { CtaButtonFragment } from '@/graphql'

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
  const { getFullPath } = useGetFullPath()

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

    if ('page' in link && link.page) {
      href = getFullPath(link.page) ?? '#'
      // label = link.label ?? link.page.data.attributes.title
    } else if ('article' in link && link.article) {
      href = getFullPath(link.article) ?? '#'
      // label = link.label ?? link.article.data.attributes.title
    } else if ('branch' in link && link.branch) {
      href = getFullPath(link.branch) ?? '#'
      // label = link.label ?? link.branch.data.attributes.title
    } else if ('asset' in link && link.asset) {
      href = getFullPath(link.asset) ?? '#'
      // label = link.label ?? link.asset.data.attributes.title
    } else if ('bundle' in link && link.bundle) {
      href = getFullPath(link.bundle) ?? '#'
      // label = link.label ?? link.bundle.data.attributes.title
    } else if ('cemetery' in link && link.cemetery) {
      href = getFullPath(link.cemetery) ?? '#'
      // label = link.label ?? link.cemetery.data.attributes.title
    } else if ('managedObject' in link && link.managedObject) {
      // label = link.label ?? link.managedObject.data.attributes.title
      href = getFullPath(link.managedObject) ?? '#'
    } else if (link.url) {
      label = link.label
      href = link.url
      target = href.startsWith('http') ? '_blank' : '_self'
    }

    return { label, href, target }
  }

  return { getLinkProps }
}
