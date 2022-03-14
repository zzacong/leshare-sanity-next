import type { GetServerSideProps } from 'next'
import { useState, useEffect, useRef, ReactNode, Fragment } from 'react'
import { getSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { HiMenu } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
import Link from 'next/link'
import Image from 'next/image'

import { Sidebar } from '$components'
import { sanityClient } from '$lib/sanity'
import logo from '$public/logo.png'
import { User } from '$lib/types'
import { userQuery } from '$lib/query'
import { sidebarState } from '$lib/atoms'
import { Transition } from '@headlessui/react'

export default function Layout({ user, children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarState)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex h-screen flex-col bg-gray-50 transition duration-75 ease-out md:flex-row">
      <div className="hidden h-screen flex-initial md:flex">
        <Sidebar user={user} />
      </div>

      <div className="flex flex-row md:hidden">
        <nav className="flex w-full flex-row items-center justify-between p-2 shadow-md">
          <button onClick={() => setSidebarOpen(p => !p)} className="flex">
            <HiMenu size={32} className="text-gray-600" />
          </button>

          <Link href="/" passHref>
            <a>
              <Image src={logo} alt="logo" objectFit="contain" width={112} />
            </a>
          </Link>

          <Link href={`/users/${user._id}`} passHref>
            <a>
              <Image
                src={user.image}
                alt={user.name}
                objectFit="contain"
                width={36}
                height={36}
                className="rounded-full"
              />
            </a>
          </Link>
        </nav>

        <Transition
          as={Fragment}
          show={sidebarOpen}
          enter="transition duration-300 ease-out"
          enterFrom="opacity-90 -translate-x-52"
          enterTo="opacity-100 translate-x-0"
          leave="transition duration-300 ease-in"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-90 -translate-x-52"
        >
          <div className="fixed z-10 h-screen w-4/5 overflow-y-auto bg-white shadow-md">
            <div className="absolute flex w-full items-center justify-end pr-4 pt-4">
              <button
                onClick={() => setSidebarOpen(false)}
                className="flex text-gray-500"
              >
                <AiOutlineClose size={30} />
              </button>
            </div>
            <Sidebar user={user} onClose={() => setSidebarOpen(false)} />
          </div>
        </Transition>
      </div>

      <div className="h-screen flex-1 overflow-y-scroll pb-2" ref={scrollRef}>
        {children}
      </div>
    </div>
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

interface Props {
  children: ReactNode
  user: User
}
