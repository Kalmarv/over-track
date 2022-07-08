import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import AccessDenied from '../../components/access-denied'
import AccountListing from '../../components/account-listing'
import UserInfo from '../../components/icons/user-info'

const Home: NextPage = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className='flex flex-col items-center justify-center w-1/2 min-h-screen mx-auto'>
        <h1>Loading</h1>
      </div>
    )
  }

  if (!session) {
    return <AccessDenied />
  }

  return (
    <>
      <UserInfo session={session} status={status} />
      <AccountListing session={session} />
    </>
  )
}

export default Home
