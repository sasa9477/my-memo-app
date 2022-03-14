export type MemoCreateProps = {
  content: string
}

export type Memo = {
  id: number
  bookmarkFlag: boolean
  createdAt: string
  updatedAt: string
} & MemoCreateProps

export type SearchQuery = {
  keywords: string
  bookmarkFlag: boolean
}

export type MemoId = number