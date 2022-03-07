import type { Memo, MemoCreateProps } from "../api/@types";
import apiClient from "./apiClient";

export const useMemoApi = () => {
    const loadAllMemos = async (): Promise<Memo[]> => {
        try {
            const response = await apiClient.memos.all.$get()
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
            const response = await apiClient.memos.search.$get({
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
            const response = await apiClient.memos.create.$post({ body: requestProps })
            return response
        } catch(e) {
            console.log(e)
        }
    }

    const updateMemo = async (memo: Memo): Promise<Memo | undefined> => {
        console.log('called updateMemo function')
        try {
            const response = apiClient.memos.update.$put({ body: memo })
            return response
        } catch(e) {
            console.log(e)
        }
    }

    const deleteMemo = async (memoId: number): Promise<Memo | undefined> => {
        try {
            const response = apiClient.memos.delete.$delete({ query: { memoId: memoId} })
            return response
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