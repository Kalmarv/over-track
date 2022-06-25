import { inferAsyncReturnType } from '@trpc/server'
import { CreateNextContextOptions } from '@trpc/server/adapters/next'
import { getSession } from 'next-auth/react'
import { prisma } from '../server/db'

export const createContext = async ({ req }: CreateNextContextOptions) => {
  const session = await getSession({ req })
  return {
    prisma,
    session,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
