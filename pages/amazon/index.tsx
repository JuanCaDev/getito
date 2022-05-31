import { useEffect } from 'react'
import Link from 'next/link'

import { useOrders } from '@/lib/orders-hooks'

import Container from '@/components/container'
import Button from '@/components/button'
import { Text } from '@chakra-ui/layout'
import { useProducts } from '@/lib/products-hooks'

export default function ProductsPage() {
  const { products, isLoading, isError} = useProducts({})

  console.log(products, isLoading, isError)

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
      <Text fontSize="xl" as="h1" fontWeight="semibold">Productos</Text>
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