// import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { client } from '../../utils/gql'
import { isDefined } from '../../utils/isDefined'
import { parseNavigation } from '../../utils/parseNavigation'

type Response = { revalidated: boolean } | { message: string } | string
type RequestPayload = { model: string; entry: { slug: string } }

const revalidate = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const payload = req.body as RequestPayload

    const slug = payload?.entry?.slug

    // TODO add proper page urls
    if (payload?.model === 'page') {
      const { navigation } = await client.General({ locale: 'sk' })
      const navMap = parseNavigation(navigation.filter(isDefined))

      const path = navMap.get(slug)
      console.log(path)

      await res.revalidate(path || `/${slug}`)
    }

    // TODO add other content types: branch, bundle, document, article

    /** Always revalidate index */
    await res.revalidate('/')

    return res.json({ revalidated: true })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error while revalidating ==>', error)
    return res.status(500).send('Error revalidating')
  }
}

export default revalidate
