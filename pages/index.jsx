import Cookies from 'js-cookie'

export default function IndexPage() {
  const access_token = Cookies.get('access_token')

  return (
    <div>access_token: {access_token}</div>
  )
}