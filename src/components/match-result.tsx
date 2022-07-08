import { GameResult } from '@prisma/client'

const MatchResult = ({ result }: { result: GameResult }) => {
  const colors = result === 'WIN' ? 'success' : result === 'LOSE' ? 'error' : 'warning'
  return <h1>{result === 'WIN' ? 'Win' : result === 'LOSE' ? 'Loss' : 'Draw'}</h1>
}

export default MatchResult
