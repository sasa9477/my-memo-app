import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { Memo } from "../../../apis/@types";
import MemoRepository from "../../../repositories/MemoRepository";

const memoRepository = new MemoRepository()

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })

  if (!session) {
    // Unauthorized
    res.status(401).end()
  }

  const memo = req.body as Memo

  if (!memo) {
    // Baq request
    res.status(400).end()
    return
  }

  const updatedMemo = await memoRepository.updateMemo(memo)

  // OK
  res.status(200).json(updatedMemo)
}

export default handler