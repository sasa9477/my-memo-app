import { Prisma } from "@prisma/client";
import { NextApiHandler } from "next";
import prisma from "../../../lib/prisma";

const handler: NextApiHandler = async ( req, res ) => {
  const keywords = req.query.keywords as string
  const bookmarkFlag = (req.query.bookmarkFlag === 'true')

  let whereQuery: Prisma.MemoWhereInput[] = []

  if (keywords) {
    whereQuery = keywords
      .trim()
      .replace('　', ' ')
      .split(' ')
      .map(key => ({
        content: {
          contains: key,
          mode: 'insensitive' // ignore-case
        }
      }))
  }

  if (bookmarkFlag) {
    whereQuery.push({
      bookmarkFlag: true
    })
  }

  if (whereQuery.length === 0) {
    const memos = await prisma.memo.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    })
    res.status(200).json(memos)
    return
  }

  const memos = await prisma.memo.findMany({
    where: {
      AND: whereQuery
    },
    orderBy: {
      createdAt: 'asc'
    }
  })
  res.status(200).json(memos)
}

export default handler