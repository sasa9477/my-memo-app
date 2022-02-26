import { NextApiHandler } from 'next';
import prismaApiClient from './../prismaApiClient';

const handler: NextApiHandler = async (req, res) => {
    const memos = await prismaApiClient.memo.findMany({
        orderBy: [
            {
                createdAt: 'asc'
            }
        ]
    });

    res.status(200).json(memos);
}

export default handler