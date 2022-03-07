/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  get: {
    query: {
      /** 検索文字列 */
      searchQuery: Types.SearchQuery
      /** ブックマーク検索フラグ */
      bookmarkSearch: Types.BookmarkSearch
    }

    status: 200
    /** 検索文字列で検索したメモを登録日時でソートして返します。 */
    resBody: Types.Memo[]
  }
}
