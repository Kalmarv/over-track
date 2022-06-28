import { Text } from '@nextui-org/react'
import { GameResult } from '@prisma/client'

const MatchResult = ({ result }: { result: GameResult }) => {
  const colors = result === 'WIN' ? 'success' : result === 'LOSE' ? 'error' : 'warning'
  return (
    <Text h5 color={colors}>
      {result === 'WIN' ? 'Win' : result === 'LOSE' ? 'Loss' : 'Draw'}
    </Text>
  )
}

export default MatchResult
