import { Input, Button, Text, Grid, Card, Container, Row } from '@nextui-org/react'
import { Session } from 'next-auth'
import Link from 'next/link'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { trpc } from '../utils/trpc'
import CustomToaster from './custom-toaster'
import { DeleteIcon } from './icons/delete-icon'
import ToastError from './toast-error'

const AccountListing = ({ session }: { session: Session }) => {
  const { invalidateQueries } = trpc.useContext()
  const createBattleAccount = trpc.useMutation('create-battle-account', {
    onSuccess: () => invalidateQueries('battle-account'),
  })
  const deleteBattleAccount = trpc.useMutation('delete-battle-account', {
    onSuccess: () => invalidateQueries('battle-account'),
  })
  const BattleNetAccounts = trpc.useQuery(['battle-account'])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    let battleNetName = formData.get('battleNetName') as string

    createBattleAccount.mutate({ battleNetName })
  }

  useEffect(() => {
    createBattleAccount.isError &&
      toast((t) => (
        <ToastError
          t={t}
          // so ugly
          message={JSON.parse(createBattleAccount.error.message ?? '')?.[0].message ?? 'Error'}
        />
      ))
  }, [createBattleAccount.isError])

  return (
    <>
      <CustomToaster />
      <Grid.Container justify='center' alignItems='center' className='mt-16'>
        <Grid>
          <Card className='max-w-full mx-2 shadow' variant='bordered'>
            <Card.Header className='mt-1'>
              <Text h4 className='mx-2'>
                BattleNet Accounts
              </Text>
              <form onSubmit={(event) => handleSubmit(event)}>
                <div className='flex flex-row'>
                  <Input
                    className='mx-2'
                    clearable
                    bordered
                    labelLeft='Battletag'
                    placeholder='Enter name'
                    name='battleNetName'
                    aria-label='BattleNet Name'
                  />
                  <Button className='mr-2 ml-6' type='submit' auto>
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
                      <Card
                        isHoverable
                        css={{ $$cardColor: '$colors$primary' }}
                        className='my-4 py-2'>
                        <Row justify='center' align='center'>
                          <Text h6 size={15} color='white' css={{ m: 0 }}>
                            No accounts! Try creating one
                          </Text>
                        </Row>
                      </Card>
                    </Container>
                  ) : (
                    BattleNetAccounts.data.map(({ id, name }) => (
                      <Container key={id}>
                        <Card
                          isHoverable
                          css={{ $$cardColor: '$colors$primary' }}
                          className='my-4 py-2'>
                          <Row justify='space-between' align='center'>
                            <Link href={`/dashboard/${encodeURIComponent(name)}`}>
                              <Text
                                h6
                                size={15}
                                css={{ m: 0 }}
                                className='hover:cursor-pointer mx-6'>
                                {name}
                              </Text>
                            </Link>
                            <Button
                              auto
                              light
                              onClick={() => deleteBattleAccount.mutate({ battleNetName: name })}>
                              <DeleteIcon fill='black' />
                            </Button>
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

export default AccountListing
