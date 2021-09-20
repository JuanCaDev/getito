import { useEffect } from 'react'

import OrderService from 'services/OrderService'
import MessageService from 'services/MessageService'
import { useOrder } from '@/lib/orders-hooks'
import { useRouter } from 'next/router'
import { useMessagesPack } from '@/lib/messages-hooks'
import Button from '@/components/button'

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
      <Button onClick={handleSendMessage}>Enviar mensaje</Button>
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