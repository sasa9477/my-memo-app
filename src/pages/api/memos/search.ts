import { NextApiHandler } from "next";
import { Memo, SearchQuery } from "../../../apis/@types";
import { loadAllMemos } from "../../../mock/fakeMemoRepository";

const handler: NextApiHandler = async ( req, res) => {
  console.log(req.query)

  let memos = loadAllMemos()

  const searchQueryJson = req.query.searchQuery
  if (typeof searchQueryJson === 'string') {
    const searchQuery = JSON.parse(searchQueryJson) as SearchQuery

    if (searchQuery.keywords) {
      memos = memos.filter(memo => memo.content.includes(searchQuery.keywords))
    }

    if (searchQuery.bookmarkSearch) {
      memos = memos.filter(memo => memo.bookmarkFlag === true)
    }
  }

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