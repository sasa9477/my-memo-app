import type { Memo } from "@prisma/client";
import apiClient from "./apiClient";

export interface ICreateMemoRequest {
    content: string
}

export interface IDeleteMemoRequest {
    id: string
}

// TODO: use apiida, swagger
export const useMemoApi = () => {
    const loadAllMemo = async () => {
        return await apiClient.get<Memo[]>("/load-all-memos").then(res => res.data);
    }

    const createMemo = async (req: ICreateMemoRequest) => {
        return await apiClient.post<Memo>("/create-memo", req).then(res => res.data);
    }

    const updateMemo = async (req: Memo) => {
        return await apiClient.post<Memo>("/update-memo", req).then(res => res.data);
    }

    const deleteMemo = async (req: IDeleteMemoRequest) => {
        const res = await apiClient.post("/delete-memo", req).then(res => res.data);
        console.log("delete memo response of prisma", res);
        return res;
    }

    return {
        loadAllMemo,
        createMemo,
        updateMemo,
        deleteMemo
    };
}