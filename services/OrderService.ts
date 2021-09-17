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

  getOrder({ id }) {
    const token = Cookies.get('access_token') || ""
    console.log("token", token)
    return Service.get(`${resource}/${id}`, {
      headers: {  
        'Authorization': `Bearer ${token}`
      }
    })
  }
}