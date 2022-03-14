import type { User } from '$lib/types'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { RiHomeFill } from 'react-icons/ri'
import { IoIosArrowForward } from 'react-icons/io'

import logo from '$public/logo.png'
import { categories } from '$lib/data'
import clsx from 'clsx'
import { useCallback } from 'react'

const isNotActiveStyle =
  'flex items-center space-x-3 px-5 py-2 capitalize text-gray-500 transition duration-200 ease-in-out hover:bg-gray-100 hover:text-black'
const isActiveStyle =
  'flex items-center space-x-3 border-r-2 border-gray-700 px-5 py-2 font-bold capitalize text-gray-800 transition duration-200 ease-in-out'

export default function Sidebar({ user, onClose }: Props) {
  const router = useRouter()
  const handleClose = useCallback(() => onClose?.(), [onClose])

  return (
    <div className="scrollbar-hide flex h-full min-w-[224px] flex-col justify-between overflow-y-scroll bg-white">
      <div className="flex flex-col">
        <Link href="/" passHref>
          <a
            onClick={handleClose}
            className="my-6 flex w-48 items-center px-5 pt-1"
          >
            <Image src={logo} alt="Logo" />
          </a>
        </Link>

        <div className="flex flex-col space-y-4">
          <Link href="/" passHref>
            <a
              onClick={handleClose}
              className={clsx(
                router.pathname === '/' ? isActiveStyle : isNotActiveStyle
              )}
            >
              <RiHomeFill />
              <span>Home</span>
            </a>
          </Link>

          <h3 className="px-5 text-base 2xl:text-xl">Discover categories</h3>

          {categories.slice(0, categories.length - 1).map(c => (
            <Link key={c.name} href={`/category/${c.name}`}>
              <a
                className={clsx(
                  router.query.slug === c.name
                    ? isActiveStyle
                    : isNotActiveStyle
                )}
                onClick={handleClose}
              >
                <Image
                  src={c.image}
                  alt={c.name}
                  width={32}
                  height={32}
                  className="rounded-full shadow-sm"
                />
                <span>{c.name}</span>
              </a>
            </Link>
          ))}
        </div>
      </div>

      {user && (
        <Link href={`/users/${user._id}`} passHref>
          <a
            onClick={handleClose}
            className="my-5 mx-3 mb-3 flex items-center space-x-2 rounded-lg bg-white p-2 shadow-lg"
          >
            <Image
              src={user.image}
              alt="User profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span>{user.name}</span>
          </a>
        </Link>
      )}
    </div>
  )
}

interface Props {
  user?: User
  onClose?: () => void
}
