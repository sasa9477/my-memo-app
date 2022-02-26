import { NextApiHandler } from "next";
import prismaApiClient from "./../prismaApiClient";

const handler: NextApiHandler = async (req, res) => {
    const id = req.query.memoId as string

    const foundMemo = await prismaApiClient.memo.findFirst({ where: { id: id }})

    res.status(200).json(foundMemo);
}

export default handler