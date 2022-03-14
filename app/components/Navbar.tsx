import type { User } from '$lib/types'
import { useRecoilState } from 'recoil'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { IoMdAdd, IoMdSearch } from 'react-icons/io'

import { searchState } from '$lib/atoms'

export default function Navbar({ user }: Props) {
  const [searchTerm, setSearchTerm] = useRecoilState(searchState)
  const router = useRouter()

  if (!user) return null

  return (
    <div className="mt-4 flex w-full items-center space-x-2 pb-6 md:space-x-4">
      <div className="flex w-full items-center justify-start rounded-md border-none bg-white px-2 outline-none focus-within:shadow-sm">
        <IoMdSearch size={21} className="ml-1" />
        <input
          type="text"
          onChange={e => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="Search"
          onFocus={() => router.push('/search')}
          className="w-full bg-white p-2 outline-none"
        />
      </div>

      <div className="flex items-center space-x-3">
        <Link href={`/users/${user._id}`} passHref>
          <a className="hidden h-12 w-12 md:flex">
            <Image
              src={user.image}
              alt="User"
              width={48}
              height={48}
              className="rounded-lg"
            />
          </a>
        </Link>

        <Link href="/pin/create" passHref>
          <a className="grid h-12 w-12 place-items-center rounded-lg bg-black text-white">
            <IoMdAdd size={24} />
          </a>
        </Link>
      </div>
    </div>
  )
}

interface Props {
  user: User | undefined
}
