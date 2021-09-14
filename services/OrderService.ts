import Service from './service'
import Cookies from 'js-cookie'

const resource = '/orders'

export default {
  getOrders() {
    const token = Cookies.get('code')
    return Service.get(`${resource}`, {
      headers: {  
        'Authorization': `Bearer ${token}`
      }
    })
  }
}