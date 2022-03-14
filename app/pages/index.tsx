import type { GetServerSideProps } from 'next'
import type { User } from '$lib/types'
import { getSession } from 'next-auth/react'

import { Pins, Layout, Feed } from '$components'
import { sanityClient } from '$lib/sanity'
import { userQuery } from '$lib/query'

export default function HomePage({ user }: PageProps) {
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

  const query = userQuery(session.user.uid!)
  const user = await sanityClient.fetch(query)

  return {
    props: {
      session,
      user,
    },
  }
}

interface PageProps {
  user: User
}
