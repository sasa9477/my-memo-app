import { NextApiHandler } from "next";
import prismaApiClient from "./../prismaApiClient";

const handler: NextApiHandler = async (req, res) => {
  if (typeof req.query.memoId === 'string') {
    const id = parseInt(req.query.memoId)

    if (Number.isNaN(id)) {
      res.status(400)
      return
    }

    const foundMemo = await prismaApiClient.memo.findFirst({
      where: {
        id: id
      }
    })

    res.status(200).json(foundMemo);
  } else {
    res.status(400)
  }
}

export default handler