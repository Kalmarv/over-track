import { Code, Container, Grid, Loading, Table, Text } from '@nextui-org/react'
import { GameResult } from '@prisma/client'
import { FC } from 'react'
import { QuickMatch } from '../utils/trpc'
import HeroProfile from './hero-profile'
import MatchHeroListing from './match-hero-listing'
import MatchResult from './match-result'

export const MatchTable: FC<{
  matchData: QuickMatch
  status: 'error' | 'loading' | 'idle' | 'success'
}> = ({ matchData, status }): JSX.Element => {
  if (status === 'loading') {
    return (
      <div className='flex flex-row justify-center align-middle m-16'>
        <Loading />
      </div>
    )
  }

  return (
    <>
      {matchData?.match.length ? (
        <Table aria-label='Example table with static content'>
          <Table.Header>
            <Table.Column>Result</Table.Column>
            <Table.Column>Role</Table.Column>
            <Table.Column>Hero</Table.Column>
            <Table.Column>Map Type</Table.Column>
            <Table.Column>Map</Table.Column>
            <Table.Column>Date</Table.Column>
          </Table.Header>
          <Table.Body>
            {matchData?.match.map((match: any) => (
              <Table.Row key={match.id}>
                <Table.Cell>
                  <MatchResult result={match.result} />
                </Table.Cell>
                <Table.Cell>{match.role}</Table.Cell>
                <Table.Cell>
                  <MatchHeroListing
                    key={match.id + match.role}
                    heroes={match.hero}
                    role={match.role}
                  />
                </Table.Cell>
                <Table.Cell>{match.mapType}</Table.Cell>
                <Table.Cell>{match.map}</Table.Cell>
                <Table.Cell>
                  {match.playedAt.toLocaleString('en-us', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <Text h3 className='text-center m-16'>
          No matches! try adding one
        </Text>
      )}
    </>
  )
}
