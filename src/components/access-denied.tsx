import { Button, Grid } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function AccessDenied() {
  const router = useRouter()

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
        <Grid.Container justify="center" gap={2}>
          <Grid>
            <Button auto onClick={() => router.push('/')}>
              Home Page
            </Button>
          </Grid>
          <Grid>
            <Button auto onClick={() => signIn()}>
              Sign in
            </Button>
          </Grid>
        </Grid.Container>
      </div>
    </>
  )
}
