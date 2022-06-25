import { Button, Card, Loading, Table, Text } from '@nextui-org/react'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { map } from 'zod'
import AccessDenied from '../../components/access-denied'
import { BackIcon } from '../../components/icons/back-icon'
import UserInfo from '../../components/icons/user-info'
import { MatchTable } from '../../components/match-table'
import { trpc } from '../../utils/trpc'

const BattleAccount: NextPage = () => {
  const { data: session, status } = useSession()
  const { invalidateQueries } = trpc.useContext()
  const createMatch = trpc.useMutation('create-quick-match')
  const router = useRouter()
  const { battleAcc } = router.query
  const matchData = trpc.useQuery(['quick-match', { battleAccName: battleAcc as string }])

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
      <div className="flex flex-row items-baseline justify-start">
        <Link href="/dashboard">
          <BackIcon className="ml-4 hover:cursor-pointer" />
        </Link>
        <Text h2 className="mx-4">
          {battleAcc}
        </Text>
      </div>
      {/* quite annoying TS */}
      {matchData && <MatchTable matchData={matchData.data ?? null} status={matchData.status} />}
    </>
  )
}

export default BattleAccount
