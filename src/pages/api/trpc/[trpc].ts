import * as trpcNext from '@trpc/server/adapters/next'
import superjson from 'superjson'
import { z } from 'zod'
import { createContext } from '../../../server/context'
import { createRouter } from '../../../server/create-router'
import { Role, GameResult, Hero, MapType, Map } from '@prisma/client'
import { TRPCError } from '@trpc/server'

export const appRouter = createRouter()
  .transformer(superjson)
  .middleware(async ({ ctx: { session }, next }) => {
    if (!session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    return next()
  })
  .query('battle-account', {
    async resolve({ ctx: { prisma, session } }) {
      return await prisma.battleAccount.findMany({ where: { userId: session?.userId as string } })
    },
  })
  .mutation('create-battle-account', {
    input: z.object({
      battleNetName: z.string().min(1),
    }),
    async resolve({ ctx: { prisma, session }, input }) {
      return await prisma.battleAccount.create({
        data: { userId: session?.userId as string, name: input.battleNetName },
      })
    },
  })
  .mutation('delete-battle-account', {
    input: z.object({
      battleNetName: z.string().min(1),
    }),
    async resolve({ ctx: { prisma, session }, input }) {
      return await prisma.battleAccount.deleteMany({
        where: { userId: session?.userId as string, name: input.battleNetName },
      })
    },
  })
  .mutation('create-quick-match', {
    input: z.object({
      battleAccountID: z.string().cuid(),
      result: z.nativeEnum(GameResult),
      role: z.nativeEnum(Role),
      hero: z.nativeEnum(Hero),
      mapType: z.nativeEnum(MapType),
      map: z.nativeEnum(Map),
      playedAt: z.date(),
    }),
    async resolve({ ctx: { prisma }, input }) {
      return await prisma.quickMatch.create({
        data: {
          battleAccountId: input.battleAccountID,
          result: input.result,
          role: input.role,
          hero: input.hero,
          mapType: input.mapType,
          map: input.map,
          playedAt: input.playedAt,
        },
      })
    },
  })
  .query('quick-match', {
    input: z.object({
      battleAccName: z.string().min(1),
    }),
    async resolve({ ctx: { prisma, session }, input }) {
      return await prisma.battleAccount.findFirst({
        where: { userId: session?.userId as string, name: input.battleAccName },
        select: {
          match: true,
        },
      })
    },
  })

// export type definition of API
export type AppRouter = typeof appRouter

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
})
