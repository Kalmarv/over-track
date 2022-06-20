import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import type { PrismaClient } from '@prisma/client'

export default NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma as PrismaClient),
  providers: [
    DiscordProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers here
  ],
})
