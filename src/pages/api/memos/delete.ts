import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  console.log('delete memoId:', req.query.memoId)
  res.json(req.body)
}

export default handler