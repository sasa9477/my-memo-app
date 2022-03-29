import { NextApiHandler } from "next";
import { addMemo } from "../../../mock/fakeMemoRepository"

const handler: NextApiHandler = (req, res) => {
  const content = req.body.content as string

  if (content) {
    const memo = addMemo(content)
    console.log('created memo:', memo)
    res.json(memo)
    return
  }

  // Bad Request
  res.status(403)
}

export default handler