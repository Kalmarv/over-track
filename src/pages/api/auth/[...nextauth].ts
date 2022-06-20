import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma as PrismaClient),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID as string,
      clientSecret: process.env.DISCORD_SECRET as string,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, user }) {
      session.userId = user.id
      return session
    },
  },
})
