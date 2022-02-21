import type { Memo } from "@prisma/client";
import axiosClient from "./axiosClient"

export interface ICreateMemoRequest {
    content: string
}

// TODO: apiida
export const useMemoApi = () => {
    const loadAll = async () => {
        return await axiosClient.get<Memo[]>("/load-all-memos").then(res => res.data);
    }

    const create = async (req: ICreateMemoRequest) => {
        return await axiosClient.post<Memo>("/create-memo", req).then(res => res.data);
    }

    return {
        loadAll,
        create
    };
}