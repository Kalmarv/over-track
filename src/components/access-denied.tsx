import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

const AccessDenied = () => {
  const router = useRouter()

  return (
    <>
      <div className='flex flex-col items-center justify-center w-1/2 min-h-screen mx-auto'>
        <h1>Access Denied</h1>
        <p>
          <a
            href='/api/auth/signin'
            onClick={(e) => {
              e.preventDefault()
              signIn()
            }}>
            You must be signed in to view this page
          </a>
        </p>
        <div>
          <div>
            <button className='btn' onClick={() => router.push('/')}>
              Home Page
            </button>
          </div>
          <div>
            <button className='btn' onClick={() => signIn()}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccessDenied
