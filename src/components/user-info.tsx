import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'

export default function UserInfo({ session }: { session: Session }) {
  return (
    <>
      {session?.user && (
        <>
          {session.user.image && <img src={session.user.image} />}
          <span>
            <small>Signed in as</small>
            <br />
            <strong>{session.user.email ?? session.user.name}</strong>
          </span>
          <a
            href={`/api/auth/signout`}
            onClick={(e) => {
              e.preventDefault()
              signOut()
            }}
          >
            Sign out
          </a>
        </>
      )}
    </>
  )
}
