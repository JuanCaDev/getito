import { NextApiHandler } from 'next'

import { parseCookies } from 'nookies'
import service from 'service'

const handler: NextApiHandler = async (req, res) => {
  const cookies = parseCookies({ req })
  try {
    const token = cookies.access_token || req.headers.authorization
    const { data } = await service.get(`/orders/${req.query.id}`, {
      headers: {  
        'Authorization': `Bearer ${token}`
      }
    })

    return res.json(data)
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ message: e.message })
  }
}

export default handler
