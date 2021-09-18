import Service from './service'
import Cookies from 'js-cookie'

const resource = '/orders'

export default {
  getOrders() {
    const token = Cookies.get('access_token') || ""
    return Service.get(`${resource}/search?seller=${process.env.NEXT_PUBLIC_ML_SELLER_ID}&limit=10&sort=date_desc`, {
      headers: {  
        'Authorization': `Bearer ${token}`
      }
    })
  },

  getOrder({ id, token }) {
    const TOKEN = token || Cookies.get('access_token') || ""
    console.log("id", id)
    console.log("token", TOKEN)
    return Service.get(`${resource}/${id}`, {
      headers: {  
        'Authorization': `Bearer ${TOKEN}`
      }
    })
  }
}