import { NextApiHandler } from "next";
import prisma from "../../../lib/prisma";

const handler: NextApiHandler = async (req, res) => {
  const memo = {
    content: req.body.content
  }
  const createdMemo = await prisma.memo.create({
    data: memo
  })

  res.status(200).json(createdMemo);
}

export default handler