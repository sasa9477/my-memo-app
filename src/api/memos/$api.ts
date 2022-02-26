/* eslint-disable */
// prettier-ignore
import type { AspidaClient, BasicHeaders } from 'aspida'
// prettier-ignore
import { dataToURLString } from 'aspida'
// prettier-ignore
import type { Methods as Methods0 } from './all'
// prettier-ignore
import type { Methods as Methods1 } from './create'
// prettier-ignore
import type { Methods as Methods2 } from './delete'
// prettier-ignore
import type { Methods as Methods3 } from './find'
// prettier-ignore
import type { Methods as Methods4 } from './update'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/memos/all'
  const PATH1 = '/memos/create'
  const PATH2 = '/memos/delete'
  const PATH3 = '/memos/find'
  const PATH4 = '/memos/update'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'

  return {
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
    update: {
      /**
       * @returns 更新されたメモを返します。
       */
      put: (option: { body: Methods4['put']['reqBody'], config?: T }) =>
        fetch<Methods4['put']['resBody'], BasicHeaders, Methods4['put']['status']>(prefix, PATH4, PUT, option).json(),
      /**
       * @returns 更新されたメモを返します。
       */
      $put: (option: { body: Methods4['put']['reqBody'], config?: T }) =>
        fetch<Methods4['put']['resBody'], BasicHeaders, Methods4['put']['status']>(prefix, PATH4, PUT, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH4}`
    }
  }
}

// prettier-ignore
export type ApiInstance = ReturnType<typeof api>
// prettier-ignore
export default api
