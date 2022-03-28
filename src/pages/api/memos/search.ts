import { NextApiHandler } from "next";
import loadMemos from "../../../components/MemoMock";

const handler: NextApiHandler = async ( req, res) => {
  const memos = loadMemos()

  res.json(memos)
}

export default handler