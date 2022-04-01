import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {

  console.log(req.body)

  res.json(req.body)
}

export default handler