import { useEffect } from 'react'
import Link from 'next/link'

import { useOrders } from '@/lib/orders-hooks'

import Orders from '@/components/orders'
import Container from '@/components/container'
import Button from '@/components/button'
import { Text } from '@chakra-ui/layout'

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

  if (isError) {
    return (
      <Container>
        <h1 className="text-xl font-semibold">Ordenes</h1>
        <p>No se inició sesión correctamente...</p>
        <Link href="/login">
          <a>
            <Button>Ir a login</Button>
          </a>
        </Link>
      </Container>
    )
  }
  
  return (
    <Container>
      <Text fontSize="xl" as="h1" fontWeight="semibold">Órdenes</Text>
      <Orders orders={orders.results} />
    </Container>
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