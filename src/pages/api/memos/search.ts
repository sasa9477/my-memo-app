import { Prisma } from "@prisma/client";
import { NextApiHandler } from "next";
import prismaApiClient from "../prismaApiClient";

const handler: NextApiHandler = async ( req, res ) => {
  const searchQuery = req.query.searchQuery
  if (typeof searchQuery === 'string') {
    const searchKeys: Prisma.MemoWhereInput[] = searchQuery
      .replace('　', ' ')
      .split(' ')
      .map(key => ({
        content: {
          contains: key,
          mode: 'insensitive' // ignore-case
        }
      }))

    const memos = await prismaApiClient.memo.findMany({
      where: {
        AND: searchKeys
      }
    })

    res.status(200).json(memos)
  } else {
    // BadRequest
    res.status(400)
  }
}

export default handler