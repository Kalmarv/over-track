import { Loading } from '@nextui-org/react'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import AccessDenied from '../../components/access-denied'
import UserInfo from '../../components/user-info'
import { trpc } from '../../utils/trpc'

const BattleAccount: NextPage = () => {
  const { data: session, status } = useSession()
  const { invalidateQueries } = trpc.useContext()
  const createMatch = trpc.useMutation('create-quick-match')
  const router = useRouter()
  const { battleAcc } = router.query

  const exampleSubmit = async () => {
    createMatch.mutate({
      battleAccountID: 'cl4ni4bja1089z4vs5csi0p7s',
      hero: 'TRACER',
      map: 'HAVANA',
      mapType: 'Assault',
      playedAt: new Date(),
      result: 'WIN',
      role: 'DAMAGE',
    })
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
      <UserInfo session={session} status={status} />
      <p> battleAcc: {battleAcc} </p>
    </>
  )
}

export default BattleAccount
