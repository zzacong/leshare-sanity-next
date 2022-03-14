import type { GetServerSideProps } from 'next'
import type { User } from '$lib/types'

import { getSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'

import { Pins, Layout, Feed } from '$components'
import { sanityClient } from '$lib/sanity'
import { userQuery } from '$lib/query'
import { searchState } from '$lib/atoms'

export default function SearchPage({ user }: PageProps) {
  const [searchTerm, setSearchTerm] = useRecoilState(searchState)

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
