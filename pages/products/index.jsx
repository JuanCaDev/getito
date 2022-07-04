import Link from 'next/link'

import { useOrders } from '@/lib/orders-hooks'

import Orders from '@/components/orders'
import Button from '@/components/button'
import { Text } from '@chakra-ui/layout'
import OrderService from 'services/OrderService'

import { parseCookies } from 'nookies'

import { Container } from "@nextui-org/react";
import { Pagination } from '@nextui-org/react';
import { useRouter } from 'next/router'

export default function OrdersPage({ initialData }) {
  const router = useRouter();

  const currentPage = Number(router.query.page)
  // 10 = limit
  const offset = currentPage === 1 ? 0 : 10 * (currentPage - 1)

  const orders = initialData

  // console.log(isLoading, isError)

  // if (isLoading) {
  //   return <p>Cargando...</p>
  // }

  // if (isError) {
  //   return (
  //     <Container>
  //       <h1 className="text-xl font-semibold">Ordenes</h1>
  //       <p>No se inició sesión correctamente...</p>
  //       <Link href="/login">
  //         <a>
  //           <Button>Ir a login</Button>
  //         </a>
  //       </Link>
  //     </Container>
  //   )
  // }

  const handleChangePagination = (page) => {
    router.query.page = page
    router.push({
      pathname: router.pathname,
      query: router.query,
    });
  }
  
  return (
    <Container>
      <Text fontSize="xl" as="h1" fontWeight="semibold">Órdenes</Text>
      <Orders orders={orders.results} />
      <div className="py-3">
        <Pagination
          total={orders.paging.total}
          initialPage={1}
          page={currentPage}
          onChange={handleChangePagination}
        />
      </div>
    </Container>
  )
}

export const getServerSideProps = async (ctx) => {
  const { access_token } = parseCookies(ctx)
  const { page } = ctx.query
  const limit = 10
  try {
    const offset = page === 1 ? 0 : (page - 1) * limit;
    const { data } = await OrderService.getOrders({
      token: access_token,
      offset: offset,
    })
    
    return {
      props: {
        initialData: data
      }
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true
    }
  }
}