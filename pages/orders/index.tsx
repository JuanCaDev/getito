import { useEffect } from 'react'

import { useOrders } from '@/lib/orders-hooks'

import Orders from '@/components/orders'

export default function OrdersPage() {
  const { orders, isLoading, isError} = useOrders({
    options: {
      // initialData: initialData,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  })

  console.log(orders, isLoading, isError)

  if (isLoading) {
    return <p>Cargando...</p>
  }
  
  return (
    <div>
      <h1>Ordenes</h1>
      <Orders orders={orders.results} />
    </div>
  )
}

// export const getServerSideProps = async (ctx) => {
//   const { data } = await OrderService.getOrders()

//   console.log(data.results)

//   return {
//     props: {
//       initialData: data.results,
//     }
//   }
// }