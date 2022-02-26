import type { Memo } from "../api/@types";
import apiClient from "./apiClient";

export const useMemoApi = () => {
    const loadAllMemos = async () => {
        try {
            const response = await apiClient.memos.all.$get()
            return response
        } catch(e) {
            console.log(e)
            return []
        }
    }

    const createMemo = async (content: string) => {
        try {
            const memo = {
                content: content
            }
            const response = await apiClient.memos.create.$post({ body: memo})
            return response
        } catch(e) {
            console.log(e)
        }
    }

    const updateMemo = async (memo: Memo) => {
        try {
            const response = apiClient.memos.update.$put({ body: memo })
            return response
        } catch(e) {
            console.log(e)
        }
    }

    const deleteMemo = async (memoId: string) => {
        try {
            const response = apiClient.memos.delete.$delete({ query: { memoId: memoId} })
            return response
        } catch(e) {
            console.log(e)
        }
    }

    return {
        loadAllMemos,
        createMemo,
        updateMemo,
        deleteMemo
    };
}