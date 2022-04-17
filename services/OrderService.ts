import Service from './service'
import Cookies from 'js-cookie'

const resource = '/orders'

export default {
  getOrders({ token = "", limit = 10, offset = 0 }) {
    const TOKEN = Cookies.get('access_token') || token
    return Service.get(`${resource}/search?seller=${process.env.NEXT_PUBLIC_ML_SELLER_ID}&sort=date_desc&limit=${limit}&offset=${offset}`, 
      {
        headers: {  
          'Authorization': `Bearer ${TOKEN}`
        }
      }
      )
  },

  getOrder({ id, token }) {
    const TOKEN = token || Cookies.get('access_token') || ""
    return Service.get(`${resource}/${id}`, {
      headers: {  
        'Authorization': `Bearer ${TOKEN}`
      }
    })
  }
}