import { Hero, Role } from '@prisma/client'
import { FC } from 'react'
import HeroProfile from './hero-profile'

const MatchHeroListing: FC<{ heroes: Hero[]; role: Role }> = ({ heroes, role }) => {
  return (
    <div className='flex flex-auto justify-between'>
      <div className='flex flex-col'>
        {heroes.map((hero) => (
          <HeroProfile key={hero + role} heroValue={hero} />
        ))}
      </div>
    </div>
  )
}

export default MatchHeroListing
