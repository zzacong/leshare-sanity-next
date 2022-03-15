import type { GetServerSideProps } from 'next'
import type { Pin, User } from '$lib/types'

import { getSession } from 'next-auth/react'

import { Feed, Layout, Pins } from '$components'
import { userQuery, searchQuery } from '$lib/query'
import { sanityClient } from '$lib/sanity'

export default function CategoryPage({ user }: PageProps) {
  return (
    <Layout user={user}>
      <Pins user={user}>
        <Feed />
      </Pins>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login',
      },
    }
  }
  const { categoryId } = context.query
  const [user] = await Promise.all([
    sanityClient.fetch(userQuery(session.user.uid!)),
    // sanityClient.fetch(searchQuery(categoryId as string)),
  ])

  return {
    props: {
      session,
      user,
      // pins,
    },
  }
}

interface PageProps {
  user: User
  // pins: Pin[]
}
