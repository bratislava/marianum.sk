// import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

type Response = { revalidated: boolean } | { message: string } | string
type RequestPayload = { model: string; entry: { slug: string } }

const revalidate = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const payload = req.body as RequestPayload

    // TODO add proper page urls
    // TODO add other content types and pages
    if (payload?.model === 'page') {
      await res.revalidate(`/${payload?.entry?.slug}`)
    }

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
