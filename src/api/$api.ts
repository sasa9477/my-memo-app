/* eslint-disable */
// prettier-ignore
import type { AspidaClient, BasicHeaders } from 'aspida'
// prettier-ignore
import { dataToURLString } from 'aspida'
// prettier-ignore
import type { Methods as Methods0 } from './memos/all'
// prettier-ignore
import type { Methods as Methods1 } from './memos/create'
// prettier-ignore
import type { Methods as Methods2 } from './memos/delete'
// prettier-ignore
import type { Methods as Methods3 } from './memos/find'
// prettier-ignore
import type { Methods as Methods4 } from './memos/search'
// prettier-ignore
import type { Methods as Methods5 } from './memos/update'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:3000/api/' : baseURL).replace(/\/$/, '')
  const PATH0 = '/memos/all'
  const PATH1 = '/memos/create'
  const PATH2 = '/memos/delete'
  const PATH3 = '/memos/find'
  const PATH4 = '/memos/search'
  const PATH5 = '/memos/update'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'

  return {
    memos: {
      all: {
        /**
         * @returns 登録されているメモを登録日時でソートして返します。
         */
        get: (option?: { config?: T }) =>
          fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json(),
        /**
         * @returns 登録されているメモを登録日時でソートして返します。
         */
        $get: (option?: { config?: T }) =>
          fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH0}`
      },
      create: {
        /**
         * @returns 登録されたメモを返します。
         */
        post: (option: { body: Methods1['post']['reqBody'], config?: T }) =>
          fetch<Methods1['post']['resBody'], BasicHeaders, Methods1['post']['status']>(prefix, PATH1, POST, option).json(),
        /**
         * @returns 登録されたメモを返します。
         */
        $post: (option: { body: Methods1['post']['reqBody'], config?: T }) =>
          fetch<Methods1['post']['resBody'], BasicHeaders, Methods1['post']['status']>(prefix, PATH1, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH1}`
      },
      delete: {
        delete: (option: { query: Methods2['delete']['query'], config?: T }) =>
          fetch<void, BasicHeaders, Methods2['delete']['status']>(prefix, PATH2, DELETE, option).send(),
        $delete: (option: { query: Methods2['delete']['query'], config?: T }) =>
          fetch<void, BasicHeaders, Methods2['delete']['status']>(prefix, PATH2, DELETE, option).send().then(r => r.body),
        $path: (option?: { method: 'delete'; query: Methods2['delete']['query'] }) =>
          `${prefix}${PATH2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      },
      find: {
        /**
         * @returns IDで指定されたメモを返します。
         */
        get: (option: { query: Methods3['get']['query'], config?: T }) =>
          fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, PATH3, GET, option).json(),
        /**
         * @returns IDで指定されたメモを返します。
         */
        $get: (option: { query: Methods3['get']['query'], config?: T }) =>
          fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, PATH3, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get'; query: Methods3['get']['query'] }) =>
          `${prefix}${PATH3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      },
      search: {
        /**
         * @returns 検索文字列で検索したメモを登録日時でソートして返します。
         */
        get: (option: { query: Methods4['get']['query'], config?: T }) =>
          fetch<Methods4['get']['resBody'], BasicHeaders, Methods4['get']['status']>(prefix, PATH4, GET, option).json(),
        /**
         * @returns 検索文字列で検索したメモを登録日時でソートして返します。
         */
        $get: (option: { query: Methods4['get']['query'], config?: T }) =>
          fetch<Methods4['get']['resBody'], BasicHeaders, Methods4['get']['status']>(prefix, PATH4, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get'; query: Methods4['get']['query'] }) =>
          `${prefix}${PATH4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      },
      update: {
        /**
         * @returns 更新されたメモを返します。
         */
        put: (option: { body: Methods5['put']['reqBody'], config?: T }) =>
          fetch<Methods5['put']['resBody'], BasicHeaders, Methods5['put']['status']>(prefix, PATH5, PUT, option).json(),
        /**
         * @returns 更新されたメモを返します。
         */
        $put: (option: { body: Methods5['put']['reqBody'], config?: T }) =>
          fetch<Methods5['put']['resBody'], BasicHeaders, Methods5['put']['status']>(prefix, PATH5, PUT, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH5}`
      }
    }
  }
}

// prettier-ignore
export type ApiInstance = ReturnType<typeof api>
// prettier-ignore
export default api
