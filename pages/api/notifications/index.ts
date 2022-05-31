import axios from 'axios'
import { NextApiHandler } from 'next'

import { parseCookies } from 'nookies'
import service from 'service'

const handler: NextApiHandler = async (req, res) => {
  try {
    const tokenBot = "5435415918:AAGN04IWV6NGM9nLpJGY6YmbWivn3wDLHw8";
    const response = await axios.post('https://api.telegram.org/bot' + tokenBot + '/sendMessage', {
      chat_id: '652810443',
      text: JSON.stringify(req.body)
    })

    return res.json(response)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: e.message, error: e })
  }
}

export default handler
