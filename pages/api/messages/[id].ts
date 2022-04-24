import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  console.log("PRUEBA")
  return res.json(req.body)
}

export default handler
