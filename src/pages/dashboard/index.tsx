import { Button, Input, Loading, Text } from '@nextui-org/react'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'
import AccessDenied from '../../components/access-denied'
import UserInfo from '../../components/user-info'
import { trpc } from '../../utils/trpc'

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const { invalidateQueries } = trpc.useContext()
  const createBattleAccount = trpc.useMutation('create-battle-account', {
    onSuccess: () => invalidateQueries('battle-account'),
  })
  const BattleNetAccounts = trpc.useQuery(['battle-account', { userId: session?.userId as string }])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    let battleNetName = formData.get('battleNetName') as string

    createBattleAccount.mutate({ userId: session?.userId as string, battleNetName })
  }

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center w-1/2 min-h-screen mx-auto">
        <h1>Loading</h1>
        <br />
        <Loading type="points" size="lg" />
      </div>
    )
  }

  if (!session) {
    return <AccessDenied />
  }

  return (
    <>
      <form onSubmit={(event) => handleSubmit(event)}>
        <UserInfo session={session} status={status} />
        <Input clearable labelPlaceholder="OW Account Name" name="battleNetName" />
        <Button type="submit">create account</Button>
      </form>
      <Text h4>BattleNet Accounts</Text>
      {BattleNetAccounts.data ? (
        <div>
          {BattleNetAccounts.data.length === 0 ? (
            <p className="text-2xl">No accounts! Try creating one</p>
          ) : (
            BattleNetAccounts.data.map(({ id, name }) => <p key={id}>{name}</p>)
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default Home
