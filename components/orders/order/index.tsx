import Link from "next/link"

import { Box, Text } from "@chakra-ui/layout"

function Order({ order }) {

  // const Item = ({ title, price }) => {
  //   return (
  //     <Box border="1px" borderColor="gray.500" borderRadius="md">
  //       <Text>{title}</Text>
  //       <Text color="gray.500" fontSize="sm">{price}</Text>
  //     </Box>
  //   )
  // }
  return (
    <>
      {order.order_items.map((order_item) => (
        <Link href={`/orders/${order_item.item.id}`}>
          <a>
            <Box border="1px" borderColor="gray.500" borderRadius="md">
              <Text>{order_item.item.title}</Text>
              <Text color="gray.500" fontSize="sm">{order_item.full_unit_price}</Text>
            </Box>
          </a>
        </Link>
      ))}
    </>
  )
}

export default Order