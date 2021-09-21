import { useEffect } from 'react'

import OrderService from 'services/OrderService'
import MessageService from 'services/MessageService'
import { useOrder } from '@/lib/orders-hooks'
import { useRouter } from 'next/router'
import { useMessagesPack } from '@/lib/messages-hooks'
import Button from '@/components/button'
import { Box, Text } from '@chakra-ui/layout'
import { convertToCOP } from '@/lib/utils'

export default function OrderDetails({ initialData }) {
  const router = useRouter()
  const { id } = router.query

  const { order, isLoading, isError} = useOrder({
    id: id,
    options: {
      initialData
    }
  })

  console.log(order, isLoading, isError)

  if (isLoading) {
    return <p>Cargando...</p>
  }

  // const { messagesPack, isLoading: isLoadingMP, isError: isErrorMP} = useMessagesPack({
  //   packId: order.pack_id || order.id,
  //   userId: order.seller.id,
  // })

  // console.log(messagesPack, isLoadingMP, isErrorMP)

  MessageService.getMessagesPack({
    packId: order.pack_id || order.id,
    userId: order.seller.id
  }).then((res) => (
    console.log(res)
  )).catch((err) => (
    console.log(err)
  ))

  const handleSendMessage = async () => {
    const { data } = await MessageService.send({
      packId: order.pack_id || order.id,
      sellerId: order.seller.id,
      buyerId: order.buyer.id,
      text: `
        :)
      `
    })

    console.log(data)
  }
  
  return (
    <>
      <h1 className="text-xl font-semibold"></h1>
      <Text fontSize="xl" fontWeight="semibold" mb="2" as="h1">Orden #{id}</Text>
      {order.order_items.map((order_item) => <>
        <Box bg="white" boxShadow="sm" borderRadius="md" px="3" py="2" key={order.id}> 
          <Text lineHeight="initial" mb="1">{order_item.item.title}</Text>
          <Text color="gray.500" fontSize="sm">SKU {order_item.item.seller_sku}</Text>
          <Text color="gray.500" fontSize="sm">{convertToCOP(order_item.full_unit_price)} x {order_item.quantity}</Text>
        </Box>
      </>)}

      <Text my="2" as="h3">Comprador</Text>
      <Box bg="white" boxShadow="sm" borderRadius="md" px="3" py="2" key={order.id}> 
        <Text lineHeight="initial" mb="1">{order.buyer.first_name} {order.buyer.last_name}</Text>
      </Box>

      <Box my="2">
        <Text as="h3">Resumen del pago</Text>
        <Text color="gray.500" as="span" fontSize="sm">{order.payments[0].status_detail} | { new Date(order.payments[0].date_approved).toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
      </Box>
      
      <Box bg="white" boxShadow="sm" borderRadius="md" px="3" py="2" key={order.id}> 
        {order.payments.map((payment) => <Box display="flex" justifyContent="space-between" mb="1">
          <Text fontSize="sm">{payment.reason.substr(0, 30)}...</Text>
          <Text fontSize="sm">{convertToCOP(payment.total_paid_amount)}</Text>
        </Box>)}
      <Text fontWeight="semibold">Total: {convertToCOP(order.total_amount)}</Text>  
      </Box>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query
  const token = ctx.req.cookies.access_token

  const { data: order } = await OrderService.getOrder({ id, token })

  if (!order) {
    return {
      notFound: true,
    };
  }
  
  // const { data: messagesPack } = await MessageService.getMessagesPack({
  //   packId: order.pack_id || order.id,
  //   userId: order.buyer.id,
  //   token
  // })

  // console.log("messagesPack", messagesPack)

  // if (!messagesPack) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {
      initialData: order,
      // messagesPackServer: messagesPack
    }
  }
}