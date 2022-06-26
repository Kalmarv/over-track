import { Checkbox, User } from '@nextui-org/react'
import { Hero, Role } from '@prisma/client'
import { FC } from 'react'
import { HeroData, heroData } from '../constants'

const HeroProfile: FC<{ heroValue: Hero; checked?: boolean }> = ({
  heroValue,
  checked = false,
}) => {
  const heroVals: HeroData[] = heroData.filter((hero) => hero.value === heroValue)
  const roleColor =
    heroVals[0]?.role === 'DAMAGE'
      ? 'error'
      : heroVals[0]?.role === 'SUPPORT'
      ? 'success'
      : 'primary'

  return (
    <>
      {checked ? (
        <Checkbox value={heroValue}>
          <User
            bordered
            src={`/hero-icons/${heroValue}.png`}
            name={heroVals[0]?.label}
            color={roleColor}
          />
        </Checkbox>
      ) : (
        <User
          bordered
          src={`/hero-icons/${heroValue}.png`}
          name={heroVals[0]?.label}
          color={roleColor}
        />
      )}
    </>
  )
}

export default HeroProfile
