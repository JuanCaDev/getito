import { VStack } from '@chakra-ui/layout'
import Order from './order'

function Orders({ orders }) {
  if (orders) {
    return (
      <div>
        <VStack
          spacing={2}
          align="stretch"
        >
          {orders.map((order) => (
            <Order order={order} key={order.id} />
          ))}
        </VStack>
      </div>
    )
  } else {
    return null
  }
}

export default Orders