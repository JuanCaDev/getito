import Service from './service'
import Cookies from 'js-cookie'

export default {
  getAll() {
    return Service.get(`/sites/${process.env.NEXT_PUBLIC_ML_SITE_ID}/categories`)
  }
}