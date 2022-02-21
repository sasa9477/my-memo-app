import { PrismaClient } from "@prisma/client";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const memo = req.body;

    const updatedMemo = await prisma.memo.update({
        where: {
            id: memo.id
        },
        data: memo
    });

    res.status(200).json(updatedMemo);
}

export default handler;