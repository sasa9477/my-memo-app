import { Memo } from "@prisma/client";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const memo: Memo = {
    ...req.body,
    updatedAt: new Date()
  };

  const updatedMemo = await prisma.memo.update({
    where: {
      id: memo.id
    },
    data: memo
  });

  res.status(200).json(updatedMemo);
}

export default handler;