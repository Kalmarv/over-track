import { Checkbox, User } from '@nextui-org/react'
import { Hero, Role } from '@prisma/client'
import { FC } from 'react'

const HeroProfile: FC<{ heroName: string; heroValue: Hero; role: Role; checked?: boolean }> = ({
  heroName,
  heroValue,
  role,
  checked = true,
}) => {
  if (!checked) {
    return (
      <User
        bordered
        src={`/hero-icons/${heroValue}.png`}
        name={heroName}
        color={role === 'DAMAGE' ? 'error' : role === 'SUPPORT' ? 'success' : 'primary'}
      />
    )
  }

  return (
    <Checkbox value={heroValue}>
      <User
        bordered
        src={`/hero-icons/${heroValue}.png`}
        name={heroName}
        color={role === 'DAMAGE' ? 'error' : role === 'SUPPORT' ? 'success' : 'primary'}
      />
    </Checkbox>
  )
}

export default HeroProfile
