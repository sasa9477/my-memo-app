import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";
import type { Memo } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Memo[]>) {
    const memos = await prisma.memo.findMany();
    res.status(200).json(memos);
}
