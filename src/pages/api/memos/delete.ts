import { NextApiHandler } from "next";
import { deleteMemo } from "../../../mock/fakeMemoRepository";

const handler: NextApiHandler = (req, res) => {
  const memoId = Number(req.query.memoId)
  console.log('delete memoId:', memoId)
  deleteMemo(memoId)
  res.json(req.body)
}

export default handler