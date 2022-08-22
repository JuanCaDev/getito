import Service from './service'
import Cookies from 'js-cookie'

// const resource = '/items'

export default {
  getProducts({ token = "", userId }) {
    const TOKEN = Cookies.get('access_token') || token
    return Service.get(`/sites/MCO/search?seller_id=${process.env.NEXT_PUBLIC_ML_SELLER_ID}`, 
      {
        headers: {  
          'Authorization': `Bearer ${TOKEN}`
        }
      }
    )
  },

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