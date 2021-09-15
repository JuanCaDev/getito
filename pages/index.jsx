import Cookies from 'js-cookie'
import OrderService from 'services/OrderService'

export default function IndexPage() {
  const access_token = Cookies.get('access_token')
  OrderService.getOrders().then((response) => console.log(response))

  return (
    <div>access_token: {access_token}</div>
  )
}