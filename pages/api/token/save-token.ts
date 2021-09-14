import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../../lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { access_token, refresh_token } = req.body
  try {
    if (!access_token || !refresh_token) {
      return res
        .status(400)
        .json({ message: '`access_token` and `refresh_token` are both required' })
    }

    const results = await query(
      `
      INSERT INTO users (access_token, refresh_token)
      VALUES (?, ?)
      `,
      [access_token, refresh_token]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
