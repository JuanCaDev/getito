import Service from './service'
import Cookies from 'js-cookie'

// const resource = '/items'

export default {
  getProduct({ token = "", id }) {
    const TOKEN = Cookies.get('access_token') || token
    return Service.get(`/items/${id}`, 
      {
        headers: {  
          'Authorization': `Bearer ${TOKEN}`
        }
      }
      )
  }
}