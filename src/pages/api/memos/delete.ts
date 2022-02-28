import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prismaApiClient from "./../prismaApiClient";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (typeof req.query.memoId === 'string') {
    const id = parseInt(req.query.memoId)

    if (Number.isNaN(id)) {
      res.status(400)
      return
    }

    const deletedMemo = await prismaApiClient.memo.delete({
      where: {
        id: id
      }
    })

    res.status(200).json(deletedMemo);
  } else {
    res.status(400)
  }
}

export default handler;