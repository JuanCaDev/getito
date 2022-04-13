import { useEffect, useState } from 'react'
import Link from 'next/link'

import { useOrders } from '@/lib/orders-hooks'

import Orders from '@/components/orders'
import Button from '@/components/button'
import { Text } from '@chakra-ui/layout'
import OrderService from 'services/OrderService'

import { parseCookies } from 'nookies'
import queryString from "query-string";

import { Container } from "@nextui-org/react";
import { Pagination } from '@nextui-org/react';
import { useRouter } from 'next/router'

export default function OrdersPage({ orders: initialData }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(
    Number(router.query.page) || 1
  );

  console.log("currentPage", currentPage)

  const { orders, isLoading, isError } = useOrders({
    offset: currentPage === 1 ? 0 : initialData.paging.limit * (currentPage - 1),
    options: {
      initialData: initialData
    }
  })

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

  const handleChangePagination = (page) => {
    setCurrentPage(page)
    
    let query = queryString.parseUrl(router.asPath).query;
    query.page = page;

    router.push({
      pathname: router.pathname,
      query: query,
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
    const { data } = await OrderService.getOrders({
      token: access_token,
      offset: page === 1 ? 0 : (page - 1) * limit,
    })
    
    return {
      props: {
        orders: data
      }
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        orders: ""
      }
    }
  }
}