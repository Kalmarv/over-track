import { Loading, Table, Text } from '@nextui-org/react'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { map } from 'zod'
import AccessDenied from '../../components/access-denied'
import UserInfo from '../../components/user-info'
import { trpc } from '../../utils/trpc'

const BattleAccount: NextPage = () => {
  const { data: session, status } = useSession()
  const { invalidateQueries } = trpc.useContext()
  const createMatch = trpc.useMutation('create-quick-match')
  const router = useRouter()
  const { battleAcc } = router.query
  const quickMatches = trpc.useQuery([
    'quick-match',
    { userId: session?.userId as string, battleAccName: battleAcc as string },
  ])

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
      <Text h2>{battleAcc}</Text>
      {quickMatches.data?.match ? (
        <Table aria-label="Example table with static content">
          <Table.Header>
            <Table.Column>Result</Table.Column>
            <Table.Column>Role</Table.Column>
            <Table.Column>Hero</Table.Column>
            <Table.Column>Map Type</Table.Column>
            <Table.Column>Map</Table.Column>
          </Table.Header>
          <Table.Body>
            {quickMatches.data?.match.map((match) => (
              <Table.Row key={match.id}>
                <Table.Cell>{match.result}</Table.Cell>
                <Table.Cell>{match.role}</Table.Cell>
                <Table.Cell>{match.hero}</Table.Cell>
                <Table.Cell>{match.mapType}</Table.Cell>
                <Table.Cell>{match.map}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : null}
    </>
  )
}

export default BattleAccount
