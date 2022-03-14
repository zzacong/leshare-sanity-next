import type { GetServerSideProps } from 'next'
import type { User } from '$lib/types'

import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'

import { CreatePin, Layout, Pins } from '$components'
import { userQuery } from '$lib/query'
import { sanityClient } from '$lib/sanity'

export default function CreatePinPage({ user }: PageProps) {
  return (
    <Layout user={user}>
      <Pins user={user}>
        <CreatePin user={user} />
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
