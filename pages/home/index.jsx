import { useEffect } from 'react'

import Cookies from 'js-cookie'
import TokenService from 'services/TokenService';
import { responseToken } from 'interfaces/responseToken'

export default function HomePage() {
  const cookie = Cookies.get('refresh_token')

  return (
    <div>Cookie: {cookie}</div>
  )
}