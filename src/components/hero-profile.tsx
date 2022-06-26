import { Checkbox, User } from '@nextui-org/react'
import { Hero, Role } from '@prisma/client'
import { FC } from 'react'

const HeroProfile: FC<{ heroName: string; heroValue: Hero; role: Role }> = ({
  heroName,
  heroValue,
  role,
}) => {
  return (
    <div className="w-1/2 my-2">
      <Checkbox value={heroValue}>
        <User
          bordered
          src={`/hero-icons/${heroValue}.png`}
          name={heroName}
          color={role === 'DAMAGE' ? 'error' : role === 'SUPPORT' ? 'success' : 'primary'}
        />
      </Checkbox>
    </div>
  )
}

export default HeroProfile
