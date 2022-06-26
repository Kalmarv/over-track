import { Button, Checkbox, Tooltip, User } from '@nextui-org/react'
import { Hero, Role } from '@prisma/client'
import { FC } from 'react'
import HeroProfile from './hero-profile'

const MatchHeroListing: FC<{ heroes: Hero[]; role: Role }> = ({ heroes, role }) => {
  // return (
  //   <div>
  //     <User
  //       bordered
  //       src={`/hero-icons/${heroValue}.png`}
  //       name={heroName}
  //       color={role === 'DAMAGE' ? 'error' : role === 'SUPPORT' ? 'success' : 'primary'}
  //     />
  //   </div>
  // )

  return (
    <div className="flex flex-auto justify-between">
      <User
        bordered
        src={`/hero-icons/${heroes[0]}.png`}
        name={heroes[0]}
        color={role === 'DAMAGE' ? 'error' : role === 'SUPPORT' ? 'success' : 'primary'}
      />
      {heroes.length > 1 && (
        <Tooltip
          placement="right"
          content={heroes.slice(1).map((hero) => (
            <HeroProfile heroName={hero} heroValue={hero} role={role} />
          ))}
        >
          <Button disabled auto>
            + {heroes.length - 1}
          </Button>
        </Tooltip>
      )}
    </div>
  )
}

export default MatchHeroListing
