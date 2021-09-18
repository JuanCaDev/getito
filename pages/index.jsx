import Link from 'next/link'

import { useOrders } from '@/lib/orders-hooks'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import Service from 'services/service'
import Button from '@/components/button'
// import OrderService from 'services/OrderService'

export default function IndexPage() {
  const { orders, isLoading, isError} = useOrders({
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })

  useEffect(() => {
    const token = Cookies.get('access_token')
    if (!token) {
      Cookies.set('access_token', 'APP_USR-8756892310430960-091714-22210345d3a66684c14636f9f62bdb50-166877629')
    }
  }, [])

  console.log(orders, isLoading, isError)

  if (isLoading) {
    return <p>Cargando...</p>
  }

  return (
    <>
      <h1>Restart token</h1>
      <Link href="/login">
        <a>
          <Button>Ir a login</Button>
        </a>
      </Link>
      <Link href="/orders">
        <a>
          <Button>Ir a ordenes</Button>
        </a>
      </Link>
    </>
  )
}