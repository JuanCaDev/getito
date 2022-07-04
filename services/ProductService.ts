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
  },

  getProductByCategoryId({ token = "", categoryId = "" }) {
    const TOKEN = Cookies.get('access_token') || token
    return Service.get(`/sites/${process.env.NEXT_PUBLIC_ML_SITE_ID}/search?category=${categoryId}`, 
      {
        headers: {  
          'Authorization': `Bearer ${TOKEN}`
        }
      }
      )
  }
}