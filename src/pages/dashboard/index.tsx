import type { NextPage } from 'next'
import Head from 'next/head'
import { signIn, signOut, useSession } from 'next-auth/react'
import AccessDenied from '../../components/access-denied'
import UserInfo from '../../components/user-info'
import { useEffect } from 'react'

const Home: NextPage = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center w-1/2 min-h-screen mx-auto">
        <h1>Loading...</h1>
      </div>
    )
  }

  if (!session) {
    return <AccessDenied />
  }

  return <UserInfo session={session} />
}

export default Home
