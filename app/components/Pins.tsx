import type { ReactNode } from 'react'
import type { User } from '$lib/types'

import { Navbar } from '$components'

export default function Pins({ children, user }: Props) {
  return (
    <div className="px-2 md:px-4">
      <div className="bg-gray-50">
        <Navbar user={user} />
      </div>
      <div className="h-full">{children}</div>
    </div>
  )
}

interface Props {
  children: ReactNode
  user: User
}
