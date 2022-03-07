import type { GetServerSideProps } from 'next'
import { FcGoogle } from 'react-icons/fc'

import logo_white from '$public/logowhite.png'
import Image from 'next/image'
import { getProviders, signIn } from 'next-auth/react'

export default function LoginPage({ providers }: PageProps) {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="relative h-full w-full">
        <video
          autoPlay
          loop
          controls={false}
          muted
          className="h-full w-full object-cover"
        >
          <source src="/share.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 bg-blend-overlay">
          <span className="flex p-5">
            <Image
              src={logo_white}
              alt="Logo"
              width={130}
              objectFit="contain"
            />
          </span>

          <div className="shadow-2xl">
            {Object.values(providers).map(provider => (
              <button
                key={provider.name}
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                className="flex items-center rounded-lg bg-[#FBF8F9] px-6 py-3"
              >
                <FcGoogle className="mr-4" size={20} />
                Continue with Google
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const providers = await getProviders()

  return { props: { providers } }
}

interface PageProps {
  providers: ReturnType<typeof getProviders>
}
