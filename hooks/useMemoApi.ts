import type { Memo } from "@prisma/client";
import apiClient from "./apiClient";

export interface ICreateMemoRequest {
    content: string
}

// TODO: use apiida, swagger
export const useMemoApi = () => {
    const loadAll = async () => {
        return await apiClient.get<Memo[]>("/load-all-memos").then(res => res.data);
    }

    const create = async (req: ICreateMemoRequest) => {
        return await apiClient.post<Memo>("/create-memo", req).then(res => res.data);
    }

    return {
        loadAll,
        create
    };
}