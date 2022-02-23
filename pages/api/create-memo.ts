import { NextApiHandler } from "next";
import prismaApiClient from "./prismaApiClient";

// TODO: use swagger
const handler: NextApiHandler = async (req, res) => {
    const memo = {
        content: req.body.content
    }
    const createdMemo = await prismaApiClient.memo.create({ data: memo });

    res.status(200).json(createdMemo);
}

export default handler