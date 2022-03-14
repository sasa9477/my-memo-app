import { Prisma } from "@prisma/client";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

const handler: NextApiHandler = async ( req, res ) => {
  const session = await getSession({ req })
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

  whereQuery.push({
    userId: session.user.id
  })

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