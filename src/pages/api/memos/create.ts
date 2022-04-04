import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { Memo } from "../../../apis/@types";
import MemoRepository from "../../../repositories/MemoRepository";

const memoRepository = new MemoRepository()

const handler: NextApiHandler<Memo> = async (req, res) => {
  const session = await getSession({ req })

  if (!session) {
    // Unauthorized
    res.status(401).end()
  }

  const userEmail = session?.user?.email
  const content = req.body.content as string

  if (!userEmail || !content) {
    // Baq request
    res.status(400).end()
    return
  }

  const memo = await memoRepository.addMemo(content, userEmail)

  // created
  res.status(201).json(memo)
}

export default handler