import { Checkbox, User } from '@nextui-org/react'
import { Hero, Role } from '@prisma/client'
import { FC } from 'react'

const MatchHeroListing: FC<{ heroName: string; heroValue: Hero; role: Role }> = ({
  heroName,
  heroValue,
  role,
}) => {
  return (
    <div>
      <User
        bordered
        src={`/hero-icons/${heroValue}.png`}
        name={heroName}
        color={role === 'DAMAGE' ? 'error' : role === 'SUPPORT' ? 'success' : 'primary'}
      />
    </div>
  )
}

export default MatchHeroListing
