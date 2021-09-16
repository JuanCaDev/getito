import { useOrders } from '@/lib/orders-hooks'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import Service from 'services/service'
// import OrderService from 'services/OrderService'

export default function IndexPage() {
  const access_token = Cookies.get('access_token')
  // OrderService.getOrders().then((response) => console.log(response))
  const resource = '/orders'

  const { orders, isLoading, isError} = useOrders({
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })

  console.log(orders, isError)

  // function getOrders(url) {
  //   const token = Cookies.get('access_token')
  //   return Service.get(`${resource}/${url}`, {
  //     headers: {  
  //       'Authorization': `Bearer ${token}`
  //     }
  //   })
  // }

  useEffect(() => {
    // Cookies.set('access_token', 'APP_USR-8756892310430960-091613-03758d5c8ec0866a1114e0d2557db7f1-166877629')
    // async function fetchData() {
    //   const { data } = await getOrders('search/recent?seller=166877629&limit=10&sort=date_desc')
    //   console.log(data)
    // }
    // fetchData()
  }, [])

  return (
    <div>access_token: {access_token}</div>
  )
}