import { VStack } from '@chakra-ui/layout'
import Order from './order'

function Orders({ orders }) {
  console.log(orders)
  if (orders) {
    return (
      <div>
        {orders.map((order) => (
          <VStack
            spacing={2}
            key={order.id}
          >
            <Order order={order} />
          </VStack>
        ))}
      </div>
    )
  } else {
    return null
  }
}

export default Orders