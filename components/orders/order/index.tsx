import Link from "next/link"

import { Box, Text } from "@chakra-ui/layout"

function Order({ order }) {
  return (
    <>
      {order.order_items.map((order_item) => (
        <Box border="2px" borderColor="gray.500" borderRadius="md" px="3" py="2">
          <Link href={`/orders/${order.id}?packId=${order.pack_id || order.id}&userId=${order.buyer.id}`}>
            <a>
              <Text>{order_item.item.title}</Text>
              <Text color="gray.500" fontSize="sm">{order_item.full_unit_price}</Text>
            </a>
          </Link>
        </Box>
      ))}
    </>
  )
}

export default Order