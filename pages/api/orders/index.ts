import { NextApiHandler } from 'next'

import { parseCookies } from 'nookies'
import service from 'service'

const handler: NextApiHandler = async (req, res) => {
  const cookies = parseCookies({ req })

  try {
    const token = cookies.access_token || req.headers.authorization
    const limit = Number(req.query.limit) || 10
    const offset = Number(req.query.offset) || 0
    const { data } = await service.get(`/orders/search?seller=${process.env.NEXT_PUBLIC_ML_SELLER_ID}&sort=date_desc&limit=${limit}&offset=${offset}`, 
      {
        headers: {  
          'Authorization': `Bearer ${token}`
        }
      }
    )

    return res.json(data)
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ message: e.message, error: e })
  }
}

export default handler
