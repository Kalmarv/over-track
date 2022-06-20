import { Button, Grid, User } from '@nextui-org/react'
import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import { useTheme as useNextTheme } from 'next-themes'
import { Switch, useTheme } from '@nextui-org/react'
import { SunIcon } from './sun-icon'
import { MoonIcon } from './moon-icon'

export default function UserInfo({ session }: { session: Session }) {
  const { setTheme } = useNextTheme()
  const { isDark, type } = useTheme()

  return (
    <>
      {session?.user && (
        <div className="m-2">
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
            <User src={session.user.image as string} name={session.user.name ?? session.user.email} />
            <Grid>
              <Button auto flat ghost color="error" onClick={() => signOut()}>
                Sign out
              </Button>
            </Grid>
          </Grid.Container>
        </div>
      )}
    </>
  )
}
