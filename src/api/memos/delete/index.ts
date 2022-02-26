/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  delete: {
    query: {
      /** 削除対象のメモID */
      memoId: Types.MemoId
    }

    status: 200
  }
}
