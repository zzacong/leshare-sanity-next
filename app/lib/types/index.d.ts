import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      uid?: string | null
    }
  }
}

export interface User {
  _id: string
  name: string
  image: string
}

export interface Pin {
  _id: string
  image: string
  destination: string
  postedBy: User
  save: {
    _key: string
    postedBy: User
  }[]
}
