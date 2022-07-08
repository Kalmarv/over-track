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
      <div className='mt-16'>
        <div>
          <div className='max-w-full mx-2 shadow'>
            <div className='mt-1'>
              <h1 className='mx-2'>BattleNet Accounts</h1>
              <form onSubmit={(event) => handleSubmit(event)}>
                <div className='flex flex-div'>
                  <input
                    className='mx-2'
                    placeholder='Enter name'
                    name='battleNetName'
                    aria-label='BattleNet Name'
                  />
                  <button className='mr-2 ml-6 btn' type='submit'>
                    Add Account
                  </button>
                </div>
              </form>
            </div>
            <div>
              {BattleNetAccounts.data ? (
                <div>
                  {BattleNetAccounts.data.length === 0 ? (
                    <div>
                      <div className='my-4 py-2'>
                        <div>
                          <h1>No accounts! Try creating one</h1>
                        </div>
                      </div>
                    </div>
                  ) : (
                    BattleNetAccounts.data.map(({ id, name }) => (
                      <div key={id}>
                        <div className='my-4 py-2'>
                          <div>
                            <Link href={`/dashboard/${encodeURIComponent(name)}`}>
                              <h1 className='hover:cursor-pointer mx-6'>{name}</h1>
                            </Link>
                            <button
                              onClick={() => deleteBattleAccount.mutate({ battleNetName: name })}>
                              <DeleteIcon fill='black' />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountListing
