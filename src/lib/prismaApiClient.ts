import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient
}

let prismaApiClient: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prismaApiClient = new PrismaClient()
} else {
  if (!global.prisma) {
    // global.prisma = new PrismaClient()
    global.prisma = new PrismaClient({
      log: ['query']
    })
  }
  prismaApiClient = global.prisma
}

export default prismaApiClient;