import { NextApiHandler } from 'next'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
    const memos = await prisma.memo.findMany();

    res.status(200).json(memos);
}

export default handler