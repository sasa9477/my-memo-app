import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prismaApiClient from "./prismaApiClient";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.body.id;

    const deleteMemo = await prismaApiClient.memo.delete({
        where: {
            id: id
        }
    });

    res.status(200).json(deleteMemo);
}

export default handler;