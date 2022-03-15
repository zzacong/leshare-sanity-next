import type { Pin } from '$lib/types'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { sanityClient } from '$lib/sanity'
import { feedQuery, searchQuery } from '$lib/query'

import { MasonryLayout, Spinner } from '$components'

export default function Feed() {
  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState<Pin[]>([])
  const router = useRouter()
  const { categoryId } = router.query

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const query = categoryId ? searchQuery(categoryId as string) : feedQuery
      const res = await sanityClient.fetch(query)
      console.log('res ->', res)
      setPins(res)
      setLoading(false)
    })()
  }, [categoryId])

  if (loading) return <Spinner text="We're adding new ideas to your feed" />

  return <div>{!!pins.length && <MasonryLayout pins={pins} />}</div>
}
