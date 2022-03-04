import { Memo } from "../api/@types";
import DateTime from "./DateTime";

export default class MemoViewModel {
  id: number
  date: string
  time: string
  content: string
  isBookmarked: boolean

  constructor(memo: Memo) {
    this.id = memo.id
    const datetime = new DateTime(memo.createdAt)
    this.date = datetime.getJapaneseShortDate()
    this.time = datetime.getShortTime()
    this.content = memo.content
    this.isBookmarked = false
  }
}