import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { 
    id,
    store,
    fullName,
    email,
    phone,
    permalink,
    accessToken,
    refreshToken
  } = req.body
  try {
    if (!id) {
      return res
        .status(400)
        .json({ message: 'No existe usuario con el `id` ' + id })
    }

    const results = await query(
      `
      INSERT INTO users (id, store, full_name, email, phone, permalink, access_token, refresh_token)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [id, store, fullName, email, phone, permalink, accessToken, refreshToken]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
