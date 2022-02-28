import { Memo } from "@prisma/client";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prismaApiClient from "./../prismaApiClient";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const memo: Memo = {
    ...req.body,
    updatedAt: new Date()
  };

  const updatedMemo = await prismaApiClient.memo.update({
    where: {
      id: memo.id
    },
    data: memo
  });

  res.status(200).json(updatedMemo);
}

export default handler;