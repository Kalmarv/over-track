import type { NextPage } from 'next'
import Head from 'next/head'
import { trpc } from '../utils/trpc'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Button, Grid, Text } from '@nextui-org/react'
import UserInfo from '../components/icons/user-info'

const Home: NextPage = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <>
      <Head>
        <title>OverTrack</title>
        <meta name='description' content='Generated by create t3 app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <UserInfo session={session} status={status} />
      <div className='m-20' />
      <div className='flex flex-col items-center justify-center w-1/2 mx-auto'>
        <Text
          h1
          weight={'extrabold'}
          size={100}
          css={{
            textGradient: '45deg, $yellow600 -20%, $red600 100%',
          }}>
          {/* TODO: Why does it cut off the K? */}
          OverTrack.
        </Text>
        <Text h4 color='primary'>
          the best way to track your Overwatch matches
        </Text>
        <div className='m-5' />
        <Grid.Container justify='center' gap={2}>
          {!session?.user && (
            <Grid>
              <Button auto color='gradient' onClick={() => signIn()}>
                Sign up
              </Button>
            </Grid>
          )}
          {session?.user && (
            <Grid>
              <Button auto onClick={() => router.push('/dashboard')}>
                Dashboard
              </Button>
            </Grid>
          )}
        </Grid.Container>
      </div>
    </>
  )
}

export default Home
