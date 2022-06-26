import { Checkbox, User } from '@nextui-org/react'
import { Hero, Role } from '@prisma/client'
import { FC } from 'react'

const HeroProfile: FC<{ heroName: string; heroValue: Hero; role: Role; checked?: boolean }> = ({
  heroName,
  heroValue,
  role,
  checked = false,
}) => {
  return (
    <div className="w-1/2 my-2">
      {checked ? (
        <Checkbox value={heroValue}>
          <User
            bordered
            src={`/hero-icons/${heroValue}.png`}
            name={heroName}
            color={role === 'DAMAGE' ? 'error' : role === 'SUPPORT' ? 'success' : 'primary'}
          />
        </Checkbox>
      ) : (
        <User
          bordered
          src={`/hero-icons/${heroValue}.png`}
          name={heroName}
          color={role === 'DAMAGE' ? 'error' : role === 'SUPPORT' ? 'success' : 'primary'}
        />
      )}
    </div>
  )
}

export default HeroProfile
