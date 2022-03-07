import { PrismaClient } from "@prisma/client";

// const prismaApiClient = new PrismaClient({
//   log: ['query']
// });

const prismaApiClient = new PrismaClient();

export default prismaApiClient;