import type { NextApiRequest, NextApiResponse } from 'next'

import { getFullPathMeiliFn } from '@/components/molecules/Navigation/NavigationProvider/useGetFullPath'
import { Branch, Bundle, Page } from '@/graphql'
import { client } from '@/services/graphql/gqlClient'
import { ArticleMeili, CemeteryMeili, DocumentMeili } from '@/services/meili/meiliTypes'
import { isDefined } from '@/utils/isDefined'
import { parseNavigation } from '@/utils/parseNavigation'

// https://docs.strapi.io/developer-docs/latest/development/backend-customization/webhooks.html#payloads
type Response = { revalidated: boolean } | { message: string } | string
type RequestPayload =
  | {
      model: 'page'
      entry: Pick<Page, 'slug'>
    }
  | {
      model: 'article'
      entry: ArticleMeili
    }
  | {
      model: 'branch'
      entry: Pick<Branch, 'slug'>
    }
  | {
      model: 'bundle'
      entry: Pick<Bundle, 'slug'>
    }
  | {
      model: 'cemetery'
      entry: Pick<CemeteryMeili, 'slug'>
    }
  | {
      model: 'document'
      entry: Pick<DocumentMeili, 'slug'>
    }
  | { model: 'procedure'; entry: unknown }

/* Webhook returns entry in "REST format" which is equivalent to Meili format, so we can use the same function and types */
const revalidate = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  // eslint-disable-next-line no-console
  console.log('api/revalidate Revalidate webhook called')
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const payload = req.body as RequestPayload
    const { model, entry } = payload

    /* Always revalidate homepage */
    const pathsToRevalidate: (string | null)[] = ['/']

    /* Other updates are ignored and revalidate just homepage */
    if (
      model === 'page' ||
      model === 'article' ||
      model === 'branch' ||
      model === 'bundle' ||
      model === 'cemetery' ||
      model === 'document'
    ) {
      const { navigation } = await client.General({ locale: 'sk' })
      const { navMap } = parseNavigation(navigation.filter(isDefined))
      const getFullPathMeili = getFullPathMeiliFn(navMap)

      /* TODO fix types: `model` and `entry` always match, but typescript doesn't know that */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      pathsToRevalidate.push(getFullPathMeili(model, entry))
    }

    if (model === 'procedure') {
      // TODO add EN variant
      pathsToRevalidate.push('/vybavenie-pohrebu/navod-ako-postupovat')
    }

    // eslint-disable-next-line no-console
    console.log('Paths to revalidate:', pathsToRevalidate.filter(isDefined))
    await Promise.all(pathsToRevalidate.filter(isDefined).map((path) => res.revalidate(path)))

    return res.json({ revalidated: true })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error while revalidating ==>', error)

    return res.status(500).send('Error revalidating')
  }
}

export default revalidate
