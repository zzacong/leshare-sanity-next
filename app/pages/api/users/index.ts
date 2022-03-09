import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from 'next-sanity'
import { sanityConfig } from '$lib/sanity'

const sanityClient = createClient({
  ...sanityConfig,
  token: process.env.SANITY_API_TOKEN,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { _id, name, image } = req.body
    try {
      await sanityClient.createIfNotExists({
        _id,
        _type: 'user',
        name,
        image,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Failed to create comment', error })
    }

    return res.status(201).json({ message: 'User created' })
  }

  return res.status(405).end()
}
