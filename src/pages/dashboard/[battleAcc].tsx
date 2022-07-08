import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AccessDenied from '../../components/access-denied'
import AddMatchModal from '../../components/add-match-modal'
import { BackIcon } from '../../components/icons/back-icon'
import UserInfo from '../../components/icons/user-info'
import { MatchTable } from '../../components/match-table'
import { trpc } from '../../utils/trpc'

const BattleAccount: NextPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { battleAcc } = router.query
  const matchData = trpc.useQuery(['quick-match', { battleAccName: battleAcc as string }])

  if (status === 'loading') {
    return (
      <div className='flex flex-col items-center justify-center w-1/2 min-h-screen mx-auto'>
        <h1>Loading</h1>
        <br />
        <h1>Loading</h1>
      </div>
    )
  }

  if (!session) {
    return <AccessDenied />
  }

  return (
    <>
      <UserInfo session={session} status={status} />
      <div className='flex flex-row items-center justify-start'>
        <Link href='/dashboard'>
          {/* This is very annoying Next */}
          {/* https://github.com/vercel/next.js/issues/7915 */}
          <a className='self-end mb-2'>
            <BackIcon className='ml-4 hover:cursor-pointer' fill='black' />
          </a>
        </Link>
        <h1>{battleAcc}</h1>
        <AddMatchModal />
      </div>
      {/* quite annoying TS */}
      {matchData && <MatchTable matchData={matchData.data ?? null} status={matchData.status} />}
    </>
  )
}

export default BattleAccount
