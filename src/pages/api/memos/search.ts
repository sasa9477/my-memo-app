import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { Memo, SearchQuery } from "../../../apis/@types";
import MemoRepository from "../../../repositories/MemoRepository";

const memoRepository = new MemoRepository()

const handler: NextApiHandler<Memo[][]> = async (req, res) => {
  const session = await getSession({ req })

  if (!session) {
    // Unauthorized
    res.status(401).end()
  }

  const userEmail = session?.user?.email
  const searchQueryJson = req.query.searchQuery as string
  const searchQuery = JSON.parse(searchQueryJson) as SearchQuery

  if (!userEmail || !searchQueryJson) {
    // Baq request
    res.status(400).end()
    return
  }

  const memos = await memoRepository.searchMemo(searchQuery, userEmail)

  // OK
  res.status(200).json(memos)
}

export default handler