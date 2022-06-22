import * as trpcNext from '@trpc/server/adapters/next'
import superjson from 'superjson'
import { z } from 'zod'
import { createContext } from '../../../server/context'
import { createRouter } from '../../../server/create-router'
import { Role, GameResult, Hero, MapType, Map } from '@prisma/client'

export const appRouter = createRouter()
  .transformer(superjson)
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? 'world'}`,
      }
    },
  })
  .query('example', {
    async resolve({ ctx: { prisma } }) {
      return await prisma.example.findMany()
    },
  })
  .mutation('create-example', {
    async resolve({ ctx: { prisma } }) {
      return await prisma.example.create({ data: {} })
    },
  })
  .mutation('create-battle-account', {
    input: z.object({
      userId: z.string().cuid(),
      battleNetName: z.string().min(1),
    }),
    async resolve({ ctx: { prisma }, input }) {
      return await prisma.battleAccount.create({ data: { userId: input.userId, name: input.battleNetName } })
    },
  })
  .query('battle-account', {
    input: z.object({
      userId: z.string().cuid(),
    }),
    async resolve({ ctx: { prisma }, input }) {
      return await prisma.battleAccount.findMany({ where: { userId: input.userId } })
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

// export type definition of API
export type AppRouter = typeof appRouter

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
})
