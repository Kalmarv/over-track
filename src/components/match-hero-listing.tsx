import { Button, Checkbox, Tooltip, User } from '@nextui-org/react'
import { Hero, Role } from '@prisma/client'
import { FC } from 'react'
import HeroProfile from './hero-profile'

const MatchHeroListing: FC<{ heroes: Hero[]; role: Role }> = ({ heroes, role }) => {
  return (
    <div className='flex flex-auto justify-between'>
      <HeroProfile heroValue={heroes[0] as Hero} />
      {heroes.length > 1 && (
        <Tooltip
          placement='right'
          content={
            <div className='flex flex-col'>
              {heroes.slice(1).map((hero) => (
                <HeroProfile heroValue={hero} />
              ))}
            </div>
          }>
          <Button disabled auto>
            + {heroes.length - 1}
          </Button>
        </Tooltip>
      )}
    </div>
  )
}

export default MatchHeroListing
