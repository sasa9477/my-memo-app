import { Prisma } from "@prisma/client";
import { NextApiHandler } from "next";
import prisma from "../../../lib/prisma";

type QueryProp = {
  searchQuery: string,
  isBookmark: boolean
}

const handler: NextApiHandler = async ( req, res ) => {
  const searchQueryRequest = req.query.searchQuery
  const bookmarkSearchRequest = req.query.bookmarkSearch

  let searchQuery: Prisma.MemoWhereInput[] = []

  if (searchQueryRequest && typeof searchQueryRequest === 'string') {
    searchQuery = searchQueryRequest
      .replace('　', ' ')
      .split(' ')
      .map(key => ({
        content: {
          contains: key,
          mode: 'insensitive' // ignore-case
        }
      }))
  }

  if (bookmarkSearchRequest && typeof bookmarkSearchRequest === 'string' && bookmarkSearchRequest === 'true') {
    searchQuery.push({
      bookmarkFlag: true
    })
  }

  if (searchQuery.length === 0) {
    const memos = await prisma.memo.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    })
    res.status(200).json(memos)
  } else {
    const memos = await prisma.memo.findMany({
      where: {
        AND: searchQuery
      },
      orderBy: {
        createdAt: 'asc'
      }
    })
    res.status(200).json(memos)
  }
}

export default handler