import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import prisma from "../../../lib/prisma";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    })
  ],
  session: {
    // セッションの保存方法
    // アダプターを使用すると デフォルトが'database'になるが middlewareが機能しないため
    // 'jwt'を設定する
    // https://next-auth.js.org/configuration/options#session
    strategy: 'jwt'
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET ?? '',
  callbacks: {
    redirect: ({ baseUrl }) => {
      // コールバックURLにリダイレクトURLをベースURLにすることで、サインイン時にbaseUrlに遷移する
      return baseUrl
    }
  },
  // theme: {
  //   colorScheme: 'auto',
  //   logo: '../../favicons/android-chrome-192x192.png'
  // },
  debug: process.env.NODE_ENV !== 'production'
})