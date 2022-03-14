import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })
  const createdMemo = await prisma.memo.create({
    data: {
      content: req.body.content,
      user: { connect: { id: session.user.id } }
    }
  })

  res.status(200).json(createdMemo);
}

export default handler