/* eslint-disable */
/** メモ識別子 */
export type MemoId = string

/** メモオブジェクト */
export type Memo = {
  /** ID */
  id?: string
  /** 登録日時(UTC) */
  createdAt?: string
  /** 更新日時(UTC) */
  updatedAt?: string
  /** コンテンツ */
  content: string
  /** ブックマークフラグ */
  isBookmarked?: boolean
}
