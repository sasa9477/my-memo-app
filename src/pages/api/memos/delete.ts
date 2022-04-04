import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import MemoRepository from "../../../repositories/MemoRepository";

const memoRepository = new MemoRepository()

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })

  if (!session) {
    // Unauthorized
    res.status(401).end()
  }

  const memoId = Number(req.query.memoId)

  if (!memoId) {
    // Baq request
    res.status(400).end()
    return
  }

  await memoRepository.deleteMemo(memoId)

  // No Content
  res.status(204).end()
}

export default handler