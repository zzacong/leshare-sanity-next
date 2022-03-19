import type { Pin as PinType } from '$lib/types'
import type { MouseEventHandler } from 'react'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'

import { urlFor } from '$lib/sanity'
import { Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import swal from 'sweetalert'

export default function Pin({ pin }: Props) {
  const router = useRouter()
  const [postHovered, setPostHovered] = useState(true)
  const [savingPost, setSavingPost] = useState(false)
  const { data: session } = useSession()

  const alreadySaved = useMemo(
    () => !!pin.save?.some(item => item?.postedBy?._id === session?.user?.uid),
    [pin.save, session?.user?.uid]
  )

  const onSavePin: MouseEventHandler = async e => {
    e.stopPropagation()
    setSavingPost(true)
    try {
      await axios.post(`/api/pin/${pin._id}/save`)
      swal('Pin saved')
    } catch (error) {
      swal('Error saving pin', (error as any).toString?.(), 'error')
      console.error(error)
    }
  }

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => router.push(`/pin/${pin._id}`)}
        className="relative w-auto cursor-zoom-in overflow-hidden transition duration-500 ease-in-out hover:shadow-lg"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={urlFor(pin.image).width(250).url()}
          alt={pin.title}
          loading="lazy"
          className="block rounded-lg"
        />

        <Transition
          show={postHovered}
          enter="transition duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute top-0 z-20 flex h-full w-full flex-col justify-between p-2 pl-1">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <a
                  href={`${pin.image.asset.url}`}
                  onClick={e => e.stopPropagation()}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white text-xl opacity-75 transition hover:opacity-100"
                >
                  <MdDownloadForOffline className="text-gray-800" />
                </a>
              </div>
              {alreadySaved ? (
                <button className="rounded-3xl bg-red-500 px-4 py-1 text-base font-bold text-white opacity-75 transition hover:opacity-100 hover:shadow-md">
                  {pin.save?.length} Saved
                </button>
              ) : (
                <button
                  onClick={onSavePin}
                  className="rounded-3xl bg-red-500 px-4 py-1 text-base font-bold text-white opacity-75 transition hover:opacity-100 hover:shadow-md"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}

interface Props {
  pin: PinType
}
