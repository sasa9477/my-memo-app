import { PrismaClient } from "@prisma/client";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.body.id;

    const deleteMemo = await prisma.memo.delete({
        where: {
            id: id
        }
    });

    res.status(200).json(deleteMemo);
}

export default handler;