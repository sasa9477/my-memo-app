/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  get: {
    query: {
      /** 取得対象のメモID */
      memoId: Types.MemoId
    }

    status: 200
    /** IDで指定されたメモを返します。 */
    resBody: Types.Memo
  }
}
