import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from 'next-sanity'
import { v4 as uuid } from 'uuid'
import { sanityConfig } from '$lib/sanity'
import { getSession } from 'next-auth/react'

const sanityClient = createClient({
  ...sanityConfig,
  token: process.env.SANITY_API_TOKEN,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { id } = req.query
    try {
      const session = await getSession({ req })
      if (!session) return res.status(401).end()

      await sanityClient
        .patch(id as string)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [
          {
            _key: uuid(),
            postedBy: {
              _type: 'reference',
              _ref: session.user?.uid,
            },
          },
        ])
        .commit()
      return res.status(200).json({ message: 'User created' })
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ message: 'Failed to create comment', error })
    }
  }

  return res.status(405).end()
}
