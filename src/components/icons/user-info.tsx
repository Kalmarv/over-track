import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'

export default function UserInfo({
  session,
  status,
}: {
  session: Session | null
  status: 'authenticated' | 'loading' | 'unauthenticated'
}) {
  if (status === 'loading') {
    return (
      <div className='m-2'>
        <div>
          <h1>Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <>
      {session?.user && (
        <div className='m-2 flex flex-row'>
          <h1>OverTrack.</h1>
          <div>
            <div>
              <button>TODO: toggle theme</button>
            </div>
            {/* TODO: default user image if none exist */}
            <img src={session.user.image as string} alt='user profile picture' />

            <h1>{session.user.name ?? session.user.email}</h1>
            <div>
              <button className='btn' onClick={() => signOut()}>
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
      {!session?.user && (
        <div className='m-2'>
          <div>
            <div>
              <button className='btn' onClick={() => signIn()}>
                Sign in
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
