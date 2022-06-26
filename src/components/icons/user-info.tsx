import { Button, Grid, Loading, User, Text } from '@nextui-org/react'
import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import { useTheme as useNextTheme } from 'next-themes'
import { Switch, useTheme } from '@nextui-org/react'
import { SunIcon } from './sun-icon'
import { MoonIcon } from './moon-icon'

export default function UserInfo({
  session,
  status,
}: {
  session: Session | null
  status: 'authenticated' | 'loading' | 'unauthenticated'
}) {
  const { setTheme } = useNextTheme()
  const { isDark } = useTheme()

  if (status === 'loading') {
    return (
      <div className="m-2">
        <Grid.Container gap={2} justify="flex-end" alignItems="center">
          <Loading />
        </Grid.Container>
      </div>
    )
  }

  return (
    <>
      {session?.user && (
        <div className="m-2 flex flex-row">
          <Text
            h2
            size={30}
            className="my-0"
            weight="bold"
            css={{
              textGradient: '45deg, $yellow600 -20%, $red600 100%',
            }}
          >
            OverTrack.
          </Text>
          <Grid.Container gap={2} justify="flex-end" alignItems="center">
            <Grid>
              <Switch
                checked={isDark}
                iconOff={<SunIcon filled />}
                iconOn={<MoonIcon filled />}
                onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
              />
            </Grid>
            {/* TODO: default user image if none exist */}
            <User
              src={session.user.image as string}
              name={session.user.name ?? session.user.email}
            />
            <Grid>
              <Button auto flat ghost color="error" onClick={() => signOut()}>
                Sign out
              </Button>
            </Grid>
          </Grid.Container>
        </div>
      )}
      {!session?.user && (
        <div className="m-2">
          <Grid.Container gap={2} justify="flex-end" alignItems="center">
            <Grid>
              <Button auto color="primary" onClick={() => signIn()}>
                Sign in
              </Button>
            </Grid>
          </Grid.Container>
        </div>
      )}
    </>
  )
}
