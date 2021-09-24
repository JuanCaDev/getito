import Service from './service'
import Cookies from 'js-cookie'
import resourceUrl from 'data/resourceUrl'

export default {
  getMessagesPack({ packId, userId, token = undefined }) {
    const TOKEN = token || Cookies.get('access_token') || ""
    return Service.get(`${resourceUrl.messagePack}/packs/${packId}/sellers/${userId}?mark_as_read=false`, {
      headers: {
        "Authorization": 'Bearer ' + TOKEN
      }
    })
  },

  send({ packId, sellerId, buyerId, text, attachments = "" }) {
    const token = Cookies.get('access_token') || ""
    return Service.post(`${resourceUrl.messagePack}/packs/${packId}/sellers/${sellerId}`, {
      "from": {
        "user_id": sellerId
      },
      "to": {
        "user_id": buyerId
      },
      "text": text,
      "attachments": attachments
    }, {
      headers: {
        "Authorization": 'Bearer ' + token,
        "cache-control": "no-cache",
        'content-type': 'application/json',
        'postman-token': '167b4f47-cb87-2b27-2a3c-cfb012df9314',
        'x-client-id': '8794217632667367'
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        // "Access-Control-Allow-Headers": "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
      }
    })
  }
}