import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (typeof req.query.memoId === 'string') {
    const id = parseInt(req.query.memoId)

    if (Number.isNaN(id)) {
      res.status(400)
      return
    }

    const deletedMemo = await prisma.memo.delete({
      where: {
        id: id
      }
    })

    res.status(200).json(deletedMemo);
    return
  }

  res.status(400)
}

export default handler;