/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  get: {
    status: 200
    /** 登録されているメモを登録日時でソートして返します。 */
    resBody: Types.Memo[]
  }
}
