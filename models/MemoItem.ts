import { Memo } from "../api/@types";
import DateTime from "../lib/DateTime";

export default class MemoItem {
  id: number
  content: string
  bookmarkFlag: boolean
  createdAt: string
  updatedAt: string
  date: string
  time: string

  constructor(memo: Memo) {
    this.id = memo.id
    this.content = memo.content
    this.bookmarkFlag = memo.bookmarkFlag
    this.createdAt = memo.createdAt
    this.updatedAt = memo.updatedAt

    const datetime = new DateTime(memo.createdAt)
    this.date = datetime.getJapaneseShortDate()
    this.time = datetime.getShortTime()
  }

  public toMemo(): Memo {
    return {
      id: this.id,
      content: this.content,
      bookmarkFlag: this.bookmarkFlag,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}