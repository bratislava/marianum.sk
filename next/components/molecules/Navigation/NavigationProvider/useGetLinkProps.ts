import { ReactNode } from 'react'

import { useGetFullPath } from '@/components/molecules/Navigation/NavigationProvider/useGetFullPath'
import { CtaButtonFragment } from '@/graphql'

/*
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

    // TODO: use title from content types when there is none set for link itself
    if ('page' in link && link.page?.data?.attributes) {
      href = getFullPath(link.page.data) ?? '#'
    } else if ('article' in link && link.article?.data?.attributes) {
      href = getFullPath(link.article.data) ?? '#'
    } else if ('branch' in link && link.branch?.data?.attributes) {
      href = getFullPath(link.branch.data) ?? '#'
    } else if ('document' in link && link.document?.data?.attributes) {
      href = getFullPath(link.document.data) ?? '#'
    } else if ('bundle' in link && link.bundle?.data?.attributes) {
      href = getFullPath(link.bundle.data) ?? '#'
    } else if ('cemetery' in link && link.cemetery?.data?.attributes) {
      href = getFullPath(link.cemetery.data) ?? '#'
    } else if ('managed_object' in link && link.managed_object?.data?.attributes) {
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
