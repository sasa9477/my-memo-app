/* eslint-disable */
// prettier-ignore
import type { AspidaClient, BasicHeaders } from 'aspida'
// prettier-ignore
import { dataToURLString } from 'aspida'
// prettier-ignore
import type { Methods as Methods0 } from './memos/create'
// prettier-ignore
import type { Methods as Methods1 } from './memos/delete'
// prettier-ignore
import type { Methods as Methods2 } from './memos/search'
// prettier-ignore
import type { Methods as Methods3 } from './memos/update'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/memos/create'
  const PATH1 = '/memos/delete'
  const PATH2 = '/memos/search'
  const PATH3 = '/memos/update'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'

  return {
    memos: {
      create: {
        post: (option: { body: Methods0['post']['reqBody'], config?: T }) =>
          fetch<Methods0['post']['resBody']>(prefix, PATH0, POST, option).json(),
        $post: (option: { body: Methods0['post']['reqBody'], config?: T }) =>
          fetch<Methods0['post']['resBody']>(prefix, PATH0, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH0}`
      },
      delete: {
        delete: (option: { query: Methods1['delete']['query'], config?: T }) =>
          fetch<void, BasicHeaders, Methods1['delete']['status']>(prefix, PATH1, DELETE, option).send(),
        $delete: (option: { query: Methods1['delete']['query'], config?: T }) =>
          fetch<void, BasicHeaders, Methods1['delete']['status']>(prefix, PATH1, DELETE, option).send().then(r => r.body),
        $path: (option?: { method: 'delete'; query: Methods1['delete']['query'] }) =>
          `${prefix}${PATH1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      },
      search: {
        get: (option: { query: Methods2['get']['query'], config?: T }) =>
          fetch<Methods2['get']['resBody']>(prefix, PATH2, GET, option).json(),
        $get: (option: { query: Methods2['get']['query'], config?: T }) =>
          fetch<Methods2['get']['resBody']>(prefix, PATH2, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get'; query: Methods2['get']['query'] }) =>
          `${prefix}${PATH2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      },
      update: {
        put: (option: { body: Methods3['put']['reqBody'], config?: T }) =>
          fetch<Methods3['put']['resBody']>(prefix, PATH3, PUT, option).json(),
        $put: (option: { body: Methods3['put']['reqBody'], config?: T }) =>
          fetch<Methods3['put']['resBody']>(prefix, PATH3, PUT, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH3}`
      }
    }
  }
}

// prettier-ignore
export type ApiInstance = ReturnType<typeof api>
// prettier-ignore
export default api
