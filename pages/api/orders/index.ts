import { Console } from 'console'
import { NextApiHandler } from 'next'

import { parseCookies } from 'nookies'

import OrderService from 'services/OrderService'

const handler: NextApiHandler = async (req, res) => {
  const cookies = parseCookies({ req })
  try {
    const { data } = await OrderService.getOrders({
      token: cookies.access_token,
      limit: Number(req.query.limit) || 0,
      offset: Number(req.query.offset) || 0,
    })

    return res.json(data)
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ message: e.message })
  }
}

export default handler
