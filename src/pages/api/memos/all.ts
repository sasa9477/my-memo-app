import { NextApiHandler } from 'next';
import prisma from '../../../lib/prisma';

const handler: NextApiHandler = async (req, res) => {
  const memos = await prisma.memo.findMany({
    orderBy: [
      {
        createdAt: 'asc'
      }
    ]
  });

  res.status(200).json(memos);
}

export default handler