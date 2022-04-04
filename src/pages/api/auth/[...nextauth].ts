import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import prismaApiClient from "../../../lib/prismaApiClient";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    })
  ],
  adapter: PrismaAdapter(prismaApiClient),
  secret: process.env.NEXTAUTH_SECRET ?? '',
  callbacks: {
    redirect: ({ baseUrl }) => {
      // コールバックURLにリダイレクトURLをベースURLにすることで、サインイン時にbaseUrlに遷移する
      return baseUrl
    }
  },
  theme: {
    colorScheme: 'auto',
    logo: '../../favicons/android-chrome-192x192.png'
  },
  debug: process.env.NODE_ENV !== 'production'
})