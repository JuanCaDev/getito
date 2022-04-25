import { useEffect, useState } from 'react'

import OrderService from 'services/OrderService'
import MessageService from 'services/MessageService'
import { useOrder } from '@/lib/orders-hooks'
import { useRouter } from 'next/router'
import { useMessagesPack } from '@/lib/messages-hooks'
import Button from '@/components/button'
import { Box, Text } from '@chakra-ui/layout'
import { convertToCOP } from '@/lib/utils'
import Axios from 'axios'

export default function OrderDetails({ order, shipping }) {
  const router = useRouter()
  const { id } = router.query

  const [productSheet, setProductSheet] = useState([])

  useEffect(() => {
    async function fetchData() {
      const idSheets = process.env.NEXT_PUBLIC_SHEETS_ID
      const apiKey = process.env.NEXT_PUBLIC_SHEETS_API_KEY
      const rangeValues = process.env.NEXT_PUBLIC_SHEETS_RANGE
      try {
        const { data } = await Axios.get(`https://content-sheets.googleapis.com/v4/spreadsheets/${idSheets}/values/${rangeValues}?access_token=${apiKey}&key=${apiKey}`)
        setProductSheet(data.values)
        console.log(order)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  // const { messagesPack, isLoading: isLoadingMP, isError: isErrorMP} = useMessagesPack({
  //   packId: order.pack_id || order.id,
  //   userId: order.seller.id,
  // })

  // console.log(messagesPack, isLoadingMP, isErrorMP)

  // MessageService.getMessagesPack({
  //   packId: order.pack_id || order.id,
  //   userId: order.seller.id
  // }).then((res) => (
  //   console.log(res)
  // )).catch((err) => (
  //   console.log(err)
  // ))

  // const handleSendMessage = async () => {
  //   const { data } = await MessageService.send({
  //     packId: order.pack_id || order.id,
  //     sellerId: order.seller.id,
  //     buyerId: order.buyer.id,
  //     text: `
  //       :)
  //     `
  //   })

  //   console.log(data)
  // }

  const detailsSymmary = (order_item) => {
    console.log(order_item)
    const convertUSDToCOP = (value) => Number(value) * 3900
    const salePrice = order_item.unit_price - order_item.sale_fee - shipping.lead_time.list_cost
    const salesProfit = order_item.unit_price - order_item.sale_fee - shipping.lead_time.list_cost
    console.log(order_item.unit_price, order_item.sale_fee, shipping.lead_time.list_cost)
    return productSheet.map(product => <Box display="grid" gridTemplateColumns="1fr 1fr">
      {order_item.item.id === product[0] && <>
        <Text fontSize="sm">Precio compra USD</Text>
        <Text fontSize="sm" textAlign="right">${product[3]}</Text>
        
        <Text fontSize="sm">Precio compra COP</Text>
        <Text fontSize="sm" textAlign="right">{convertToCOP(convertUSDToCOP(product[3]))}</Text>
        
        <Text fontSize="sm">Pago comisión ML COP</Text>
        <Text fontSize="sm" textAlign="right">{convertToCOP(order_item.sale_fee)}</Text>
        
        <Text fontSize="sm">Precio venta COP</Text>
        <Text fontSize="sm" textAlign="right">{convertToCOP(salePrice)}</Text>
        
        <Text fontSize="sm">Precio envío COP</Text>
        <Text fontSize="sm" textAlign="right">{convertToCOP(shipping.lead_time.list_cost)}</Text>
        
        <Text fontSize="sm" fontWeight="semibold">Ganancia COP</Text>
        <Text fontSize="sm" fontWeight="semibold" textAlign="right">{convertToCOP(salesProfit - convertUSDToCOP(product[3]))}</Text>
      </>}
    </Box>)
  }
  
  return (
    <>
      <h1 className="text-xl font-semibold"></h1>
      <Text fontSize="xl" fontWeight="semibold" mb="2" as="h1">Orden #{id}</Text>
      {order.order_items.map((order_item) => <>
        <Box bg="white" boxShadow="sm" borderRadius="md" px="3" py="2" key={order_item.item.id}> 
          <Text lineHeight="initial" mb="1">{order_item.item.title}</Text>
          <Text color="gray.500" fontSize="sm">SKU {order_item.item.seller_sku}</Text>
          <Text color="gray.500" fontSize="sm">{convertToCOP(order_item.full_unit_price)} x {order_item.quantity}</Text>
          {detailsSymmary(order_item)}
        </Box>
      </>)}

      <Text my="2" as="h3">Comprador</Text>
      <Box bg="white" boxShadow="sm" borderRadius="md" px="3" py="2"> 
        <Text lineHeight="initial" mb="1">{order.buyer.first_name} {order.buyer.last_name}</Text>
      </Box>

      <Box my="2">
        <Text as="h3">Resumen del pago</Text>
        <Text color="gray.500" as="span" fontSize="sm">{order.payments[0].status_detail} | { new Date(order.payments[0].date_approved).toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
      </Box>
      
      <Box bg="white" boxShadow="sm" borderRadius="md" px="3" py="2"> 
        {order.payments.map((payment) => <Box display="grid" gridTemplateColumns="1fr 1fr" mb="1" key={payment.id}>
          <Text fontSize="sm">Envío</Text>
          <Text fontSize="sm" textAlign="right">{convertToCOP(shipping.lead_time.list_cost)}</Text>
          <Text fontSize="sm">{payment.reason.substr(0, 30)}...</Text>
          <Text fontSize="sm" textAlign="right">{convertToCOP(payment.total_paid_amount)}</Text>
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

  const { data: shipping } = await Axios.get(`https://api.mercadolibre.com/shipments/${order.shipping.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'x-format-new': true
    }
  })
  
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
      order: order,
      shipping: shipping
      // messagesPackServer: messagesPack
    }
  }
}