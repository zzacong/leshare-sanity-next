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
