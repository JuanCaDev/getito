import Service from './service'
import Cookies from 'js-cookie'
import resourceUrl from 'data/resourceUrl'

export default {
  getMessagesPack({ packId, userId, token }) {
    const TOKEN = token || Cookies.get('access_token') || ""
    return Service.get(`${resourceUrl.messagePack}/packs/${packId}/sellers/${userId}`, {
      headers: {
        Authorization: 'Bearer ' + TOKEN
      }
    })
  },

  send({ packId, sellerId, buyerId, text, attachments = "" }) {
    const token = Cookies.get('access_token') || ""
    return Service.post(`${resourceUrl.messagePack}/packs/${packId}/sellers/${sellerId}`, {
      from: {
        user_id: sellerId
      },
      to: {
        user_id: buyerId
      },
      text,
      attachments
    }, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }
}