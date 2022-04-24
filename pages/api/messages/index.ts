// send({ packId, sellerId, buyerId, text, attachments = "" }) {
//   const token = Cookies.get('access_token') || ""
//   return Service.post(`${resourceUrl.messagePack}/packs/${packId}/sellers/${sellerId}?application_id=${process.env.NEXT_PUBLIC_ML_CLIENT_ID}`, {
//     "from": {
//       "user_id": sellerId
//     },
//     "to": {
//       "user_id": buyerId
//     },
//     "text": text,
//     "attachments": attachments
//   }, {
//     headers: {
//       "Authorization": 'Bearer ' + token,
//       "cache-control": "no-cache",
//       'content-type': 'application/json',
//       'postman-token': '167b4f47-cb87-2b27-2a3c-cfb012df9314',
//       'x-client-id': '8794217632667367'
//       // "Access-Control-Allow-Origin": "*",
//       // "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
//       // "Access-Control-Allow-Headers": "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
//     }
//   })
// }

import resourceUrl from 'data/resourceUrl'
import { NextApiHandler } from 'next'

import { parseCookies } from 'nookies'

import service from 'service'

const handler: NextApiHandler = async (req, res) => {
  if(req.method !== 'POST') 
      return res.status(404).json({ message: 'Bad Request!' });
      
  const cookies = parseCookies({ req })

  try {
    const token = cookies.access_token || req.headers.authorization
    const { packId, text } = req.body

    console.log(token, packId, text)
    
    const { data } = await service.post(`${resourceUrl.messages}/action_guide/packs/${packId}/option`, {
      option_id: 'OTHER',
      text: text
    }, {
      headers: {
        "Authorization": 'Bearer ' + token,
      }
    })

    return res.json(data)
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ message: e.message, error: e })
  }
}

export default handler
