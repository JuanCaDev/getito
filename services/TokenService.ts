// import Service from './service'
import Cookies from 'js-cookie'

// import { responseToken } from 'interfaces/responseToken'

// const resource = '/oauth/token'

export default {
  async getAccessToken(code: string) {
    Cookies.set('code', code)
    const response = await fetch('https://api.mercadolibre.com/oauth/token', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'accept': 'application/json',
      },
      body: JSON.stringify({
        'grant_type': 'authorization_code',
        'client_id': process.env.NEXT_PUBLIC_ML_CLIENT_ID,
        'client_secret': process.env.NEXT_PUBLIC_ML_CLIENT_SECRET,
        'code': code,
        'redirect_uri': process.env.NEXT_PUBLIC_ML_REDIRECT_URI,
      })
    });

    console.log(response)
    return await response.json()
  }
}