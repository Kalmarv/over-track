import type { NextPage } from 'next'
import Head from 'next/head'
import { trpc } from '../utils/trpc'
import { signIn, signOut, useSession } from 'next-auth/react'

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const hello = trpc.useQuery(['hello', { text: 'from tRPC' }])
  const exampleData = trpc.useQuery(['example'])
  const { invalidateQueries } = trpc.useContext()
  const createExample = trpc.useMutation('create-example', {
    onSuccess: () => invalidateQueries('example'),
  })

  return (
    <>
      <Head>
        <title>Create t3 App</title>
        <meta name="description" content="Generated by create t3 app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center w-1/2 min-h-screen mx-auto">
        <div className="py-6 text-2xl">{hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}</div>
        <div className="py-6 text-2xl">
          <p>Data from Prisma:</p>
          {exampleData.data ? (
            <div>
              {exampleData.data.length === 0 ? (
                <p className="text-2xl">No data available, create new!</p>
              ) : (
                exampleData.data.map(({ id }: any) => <p key={id}>{id}</p>)
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <button
          onClick={() => createExample.mutate()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Example
        </button>
        {!session && (
          <>
            <span>You are not signed in</span>
            <a
              href={`/api/auth/signin`}
              onClick={(e) => {
                e.preventDefault()
                signIn()
              }}
            >
              Sign in
            </a>
          </>
        )}
        {session?.user && (
          <>
            {session.user.image && <span style={{ backgroundImage: `url('${session.user.image}')` }} />}
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
      </div>
    </>
  )
}

export default Home
