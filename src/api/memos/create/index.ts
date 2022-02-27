/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  post: {
    status: 200
    /** 登録されたメモを返します。 */
    resBody: Types.Memo
    reqBody: Types.MemoCreateProps
  }
}
