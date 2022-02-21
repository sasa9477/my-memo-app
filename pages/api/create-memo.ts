import { PrismaClient } from "@prisma/client";
import { NextApiHandler } from "next";

const prisma = new PrismaClient();

// TODO: use swagger
const handler: NextApiHandler = async (req, res) => {
    const memo = {
        content: req.body.content
    }
    const createdMemo = await prisma.memo.create({ data: memo });

    res.status(200).json(createdMemo);
}

export default handler