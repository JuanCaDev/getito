import Service from './service'
import Cookies from 'js-cookie'

// const resource = '/items'

export default {
  getProducts({ token = "", offset }) {
    const TOKEN = Cookies.get('access_token') || token
    return Service.get(`/sites/MCO/search?seller_id=${process.env.NEXT_PUBLIC_ML_SELLER_ID}&limit=10&offset=${offset}`, 
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

  getProductBySKU({ token = "", sku }) {
    const TOKEN = Cookies.get('access_token') || token
    return Service.get(`/users/${process.env.NEXT_PUBLIC_ML_SELLER_ID}/items/search?seller_sku=${sku}`, 
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
  },

  getListingPrices({ token = "", price = "", categoryId = "" }) {
    const TOKEN = Cookies.get('access_token') || token
    return Service.get(`/sites/${process.env.NEXT_PUBLIC_ML_SITE_ID}/listing_prices?price=${price}&category_id=${categoryId}`, 
      {
        headers: {  
          'Authorization': `Bearer ${TOKEN}`
        }
      }
    )
  },

  getShippingPrices({ token = "", id = "" }) {
    const TOKEN = Cookies.get('access_token') || token
    return Service.get(`/items/${id}/shipping_options`, 
      {
        headers: {  
          'Authorization': `Bearer ${TOKEN}`
        }
      }
    )
  }
}