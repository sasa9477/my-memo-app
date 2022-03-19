import { useEffect, useState } from "react";
import type { Memo, MemoCreateProps, MemoId, SearchQuery } from "../interfaces/@types";
import axiosApiClient from "../lib/axiosApiClient";

export const useMemoApi = () => {
  const searchMemos = (searchQuery: SearchQuery): Memo[] => {
    const [ memos, setMemos ] = useState<Memo[]>([])
    useEffect(() => {
      const fetch = async () => {
        try {
          const res = await axiosApiClient.memos.search.$get({
            query: searchQuery
          })
          setMemos(res)
        } catch(e) {
          console.log(e)
        }
      }
      fetch()
    }, [searchQuery, setMemos])

    return memos
  }

  const createMemo = async (memoCreateProps: MemoCreateProps): Promise<Memo | undefined> => {
    try {
      const response = await axiosApiClient.memos.create.$post({
        body: memoCreateProps
      })
      return response
    } catch(e) {
      console.log(e)
    }
  }

  const updateMemo = async (memo: Memo): Promise<Memo | undefined> => {
    try {
      const response = await axiosApiClient.memos.update.$put({
        body: memo
      })
      return response
    } catch(e) {
      console.log(e)
    }
  }

  const deleteMemo = async (memoId: MemoId): Promise<void> => {
    try {
      await axiosApiClient.memos.delete.$delete({
        query: {
          memoId: memoId
        }
      })
    } catch(e) {
      console.log(e)
    }
  }

  return {
    searchMemos,
    createMemo,
    updateMemo,
    deleteMemo
  };
}