import axios from 'axios'
import { getSession } from 'next-auth/react'

export async function createUser() {
  const session = await getSession()
  if (!session?.user) return

  await axios.post('/api/users', {
    _id: session.user.uid,
    name: session.user.name,
    image: session.user.image,
  })
}
