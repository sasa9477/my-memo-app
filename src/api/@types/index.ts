/* eslint-disable */
/** メモ識別子 */
export type MemoId = number

/** 検索クエリ */
export type SearchQuery = string

/** ブックマーク検索フラグ */
export type BookmarkSearch = boolean

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
  bookmarkFlag: boolean
} & MemoCreateProps
