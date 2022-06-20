import { Button } from '@nextui-org/react'
import { signIn } from 'next-auth/react'

export default function AccessDenied() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-1/2 min-h-screen mx-auto">
        <h1>Access Denied</h1>
        <p>
          <a
            href="/api/auth/signin"
            onClick={(e) => {
              e.preventDefault()
              signIn()
            }}
          >
            You must be signed in to view this page
          </a>
        </p>
        <Button onClick={() => signIn()}>Sign in</Button>
      </div>
    </>
  )
}
