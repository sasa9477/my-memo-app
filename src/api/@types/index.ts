/* eslint-disable */
/** メモ識別子 */
export type MemoId = number

export type MemoCreateProps = {
  /** 投稿内容 */
  content: string
}

/** メモオブジェクト */
export type Memo = {
  /** ID */
  id: number
  /** 登録日時(UTC) */
  createdAt: string
  /** 登録日時(UTC) */
  updatedAt: string
  /** ブックマークフラグ */
  isBookmarked: boolean
} & MemoCreateProps
