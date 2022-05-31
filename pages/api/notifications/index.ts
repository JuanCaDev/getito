import axios from 'axios'
import { NextApiHandler } from 'next'

import { parseCookies } from 'nookies'
import service from 'service'

const handler: NextApiHandler = async (req, res) => {
  try {
    // const tokenBot = "5435415918:AAGN04IWV6NGM9nLpJGY6YmbWivn3wDLHw8";
    // await axios.post('https://api.telegram.org/bot' + tokenBot + '/sendMessage', {
    //   chat_id: '-701539274',
    //   text: JSON.stringify(req.body)
    // })

    // const { data } = await axios.post('https://api.mercadolibre.com' + req.body.resource, {}, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //   }
    // })  

    return res.status(200).json({ message: 'ok' })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: e.message, error: e })
  }
}

export default handler
