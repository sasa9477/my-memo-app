import { NextApiHandler } from "next";
import { Memo } from "../../../apis/@types";
import { updateMemo } from "../../../mock/fakeMemoRepository";

const handler: NextApiHandler = (req, res) => {
  const memo = req.body as Memo

  if (memo) {
    const updatedMemo = updateMemo(memo)
    console.log('updated memo:', updatedMemo)
    res.json(updatedMemo)
    return
  }

  // Bad Request
  res.status(403)
}

export default handler