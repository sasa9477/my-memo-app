import { NextApiHandler } from "next";
import { Memo } from "../../../apis/@types";
import { loadAllMemos } from "../../../mock/fakeMemoRepository";

const handler: NextApiHandler = async ( req, res) => {
  const memos = loadAllMemos()

  const result = memos.reduce((previous: Memo[][], current: Memo) => {
    const lastArray: Memo[] = previous[previous.length - 1] ?? []
    const firstItem: Memo = lastArray[0]
    if (previous.length === 0 || (firstItem && firstItem.createdDate !== current.createdDate)) {
      const newArray = [ current ]
      previous.push(newArray)
      return previous
    }

    lastArray.push(current)
    return previous
  }, [])

  res.json(result)
}

export default handler