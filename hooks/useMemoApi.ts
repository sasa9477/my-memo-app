import type { Memo, MemoCreateProps, MemoId, SearchQuery } from "../api/@types";
import axiosApiClient from "../lib/axiosApiClient";

export const useMemoApi = () => {
    const searchMemos = async (searchQuery: SearchQuery): Promise<Memo[]> => {
        console.log('called searchMemos function')
        try {
            const res = await axiosApiClient.memos.search.$get({
                query: searchQuery
            })
            return res
        } catch(e) {
            console.log(e)
            return []
        }
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