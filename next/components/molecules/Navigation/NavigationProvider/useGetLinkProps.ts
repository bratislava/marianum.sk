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

    if ('page' in link && link.page?.data?.attributes) {
      href = getFullPath(link.page.data) ?? '#'
      // label = link.label ?? link.page.data.attributes.title
    } else if ('article' in link && link.article?.data?.attributes) {
      href = getFullPath(link.article.data) ?? '#'
      // label = link.label ?? link.article.data.attributes.title
    } else if ('branch' in link && link.branch?.data?.attributes) {
      href = getFullPath(link.branch.data) ?? '#'
      // label = link.label ?? link.branch.data.attributes.title
    } else if ('document' in link && link.document?.data?.attributes) {
      href = getFullPath(link.document.data) ?? '#'
      // label = link.label ?? link.document.data.attributes.title
    } else if ('bundle' in link && link.bundle?.data?.attributes) {
      href = getFullPath(link.bundle.data) ?? '#'
      // label = link.label ?? link.bundle.data.attributes.title
    } else if ('cemetery' in link && link.cemetery?.data?.attributes) {
      href = getFullPath(link.cemetery.data) ?? '#'
      // label = link.label ?? link.cemetery.data.attributes.title
    } else if ('managed_object' in link && link.managed_object?.data?.attributes) {
      // label = link.label ?? link.managed_object.data.attributes.title
      href = getFullPath(link.managed_object.data) ?? '#'
    } else if (link?.url) {
      label = link.label ?? link.url
      href = link.url
      target = href.startsWith('http') ? '_blank' : '_self'
    }

    return { label, href, target }
  }

  return { getLinkProps }
}
