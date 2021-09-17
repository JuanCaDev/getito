import { useEffect } from 'react'

import { useOrders } from '@/lib/orders-hooks'
import Cookies from 'js-cookie'
import OrderService from 'services/OrderService'

import Orders from '@/components/orders'

export default function OrdersPage({ initialData }) {
  const { orders, isLoading, isError} = useOrders({
    initialData: initialData,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })

  console.log(orders, isLoading, isError)

  if (isLoading) {
    return <p>Cargando...</p>
  }
  
  return (
    <div>
      <h1>Ordenes</h1>
      <Orders orders={orders} />
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const { data } = await OrderService.getOrders()

  return {
    props: {
      initialData: data.results,
    }
  }
}