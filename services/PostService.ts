import Service from './service'
import Cookies from 'js-cookie'

import { responseToken } from 'interfaces/responseToken'

const resource = '/oauth/token'

export default {
  getAccessToken(code: string) {
    Cookies.set('code', code)
    return Service.post(`${resource}`, {  
      'grant_type': 'authorization_code',
      'client_id': process.env.NEXT_PUBLIC_ML_CLIENT_ID,
      'client_secret': process.env.NEXT_PUBLIC_ML_CLIENT_SECRET,
      'code': code,
      'redirect_uri': process.env.NEXT_PUBLIC_ML_REDIRECT_URI,
    })
  }
}