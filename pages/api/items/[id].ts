import { NextApiHandler } from 'next'

import { parseCookies } from 'nookies'

import ProductService from 'services/ProductService'

const handler: NextApiHandler = async (req, res) => {
  const cookies = parseCookies({ req })
  try {
    const { data } = await ProductService.getProduct({
      token: cookies.access_token,
      id: req.query.id
    })

    return res.json(data)
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ message: e.message })
  }
}

export default handler
