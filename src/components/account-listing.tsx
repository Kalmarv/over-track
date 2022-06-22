import { Input, Button, Text, Grid, Card, Container, Row, useTheme } from '@nextui-org/react'
import { Session } from 'next-auth'
import Link from 'next/link'
import { trpc } from '../utils/trpc'

export default function AccountListing({ session }: { session: Session }) {
  const { invalidateQueries } = trpc.useContext()
  const createBattleAccount = trpc.useMutation('create-battle-account', {
    onSuccess: () => invalidateQueries('battle-account'),
  })
  const BattleNetAccounts = trpc.useQuery(['battle-account', { userId: session?.userId as string }])

  const { isDark } = useTheme()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    let battleNetName = formData.get('battleNetName') as string

    createBattleAccount.mutate({ userId: session?.userId as string, battleNetName })
  }

  return (
    <>
      <Grid.Container justify="center" alignItems="center" className="mt-16">
        <Grid>
          <Card className="max-w-full mx-2 shadow" variant="bordered">
            <Card.Header className="mt-1">
              <Text h4 className="mx-2">
                BattleNet Accounts
              </Text>
              <form onSubmit={(event) => handleSubmit(event)}>
                <div className="flex flex-row">
                  <Input
                    className="mx-2"
                    clearable
                    bordered
                    labelLeft="Battletag"
                    placeholder="Enter name"
                    name="battleNetName"
                    aria-label="BattleNet Name"
                  />
                  <Button className="mr-2 ml-6" type="submit" auto>
                    Add Account
                  </Button>
                </div>
              </form>
            </Card.Header>
            <Card.Body>
              {BattleNetAccounts.data ? (
                <div>
                  {BattleNetAccounts.data.length === 0 ? (
                    <Container>
                      <Card isHoverable css={{ $$cardColor: '$colors$primary' }} className="my-4 py-2">
                        <Row justify="center" align="center">
                          <Text h6 size={15} color="white" css={{ m: 0 }}>
                            No accounts! Try creating one
                          </Text>
                        </Row>
                      </Card>
                    </Container>
                  ) : (
                    BattleNetAccounts.data.map(({ id, name }) => (
                      <Container key={id}>
                        <Card isHoverable css={{ $$cardColor: '$colors$primary' }} className="my-4 py-2">
                          <Row justify="center" align="center">
                            <Text h6 size={15} color="white" css={{ m: 0 }}>
                              <Link href={`/dashboard/${encodeURIComponent(name)}`}>{name}</Link>
                            </Text>
                          </Row>
                        </Card>
                      </Container>
                    ))
                  )}
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </>
  )
}
