import Service from './service'
import Cookies from 'js-cookie'

const resource = '/orders'

export default {
  getOrders() {
    const token = Cookies.get('access_token')
    return Service.get(`${resource}`, {
      headers: {  
        'Authorization': `Bearer ${token}`
      }
    })
  },

  getOrder({ id }) {
    const token = Cookies.get('access_token')
    return Service.get(`${resource}/${id}`, {
      headers: {  
        'Authorization': `Bearer ${token}`
      }
    })
  }
}