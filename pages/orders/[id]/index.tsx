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
      <h1 className="text-xl font-semibold">Orden #{id}</h1>
      {order.order_items.map((order_item) => <>
        <Box bg="white" boxShadow="sm" borderRadius="md" px="3" py="2" key={order.id}> 
          <Text lineHeight="initial" mb="1">{order_item.item.title}</Text>
          <Text color="gray.500" fontSize="sm">SKU {order_item.item.seller_sku}</Text>
          <Text color="gray.500" fontSize="sm">{convertToCOP(order_item.full_unit_price)} x {order_item.quantity}</Text>
        </Box>
      </>)}
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