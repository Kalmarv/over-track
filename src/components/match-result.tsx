import { Text } from '@nextui-org/react'
import { GameResult, Hero, Role } from '@prisma/client'
import { FC } from 'react'

const MatchResult = ({ result }: { result: GameResult }) => {
  return (
    <Text h5 color={result === 'WIN' ? 'success' : result === 'LOSE' ? 'error' : 'warning'}>
      {result === 'WIN' ? 'Win' : result === 'LOSE' ? 'Loss' : 'Draw'}
    </Text>
  )
}

export default MatchResult
