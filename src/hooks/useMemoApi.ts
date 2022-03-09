import type { Memo, MemoCreateProps } from "../api/@types";
import axiosApiClient from "../lib/axiosApiClient";

export const useMemoApi = () => {
    const loadAllMemos = async (): Promise<Memo[]> => {
        try {
            const response = await axiosApiClient.memos.all.$get()
            return response
        } catch(e) {
            console.log(e)
            return []
        }
    }

    const searchMemos = async (
        searchQuery: string,
        bookmarkSearch: boolean
        ): Promise<Memo[]> => {
        try {
            const response = await axiosApiClient.memos.search.$get({
                query: {
                    searchQuery: searchQuery,
                    bookmarkSearch: bookmarkSearch
                }
            })
            return response
        } catch(e) {
            console.log(e)
            return []
        }
    }

    const createMemo = async (content: string): Promise<Memo | undefined> => {
        try {
            const requestProps: MemoCreateProps = {
                content: content
            }
            const response = await axiosApiClient.memos.create.$post({ body: requestProps })
            return response
        } catch(e) {
            console.log(e)
        }
    }

    const updateMemo = async (memo: Memo): Promise<Memo | undefined> => {
        console.log('called updateMemo function')
        try {
            const response = await axiosApiClient.memos.update.$put({ body: memo })
            return response
        } catch(e) {
            console.log(e)
        }
    }

    const deleteMemo = async (memoId: number): Promise<void> => {
        try {
            await axiosApiClient.memos.delete.$delete({ query: { memoId: memoId} })
        } catch(e) {
            console.log(e)
        }
    }

    return {
        loadAllMemos,
        searchMemos,
        createMemo,
        updateMemo,
        deleteMemo
    };
}