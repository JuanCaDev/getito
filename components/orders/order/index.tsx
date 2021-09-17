import Link from "next/link"

import { Box, Text } from "@chakra-ui/layout"

function Order({ id, title, price }) {

  const Item = ({ title, price }) => {
    return (
      <Box border="1px" borderColor="gray.500" borderRadius="md">
        <Text>{title}</Text>
        <Text color="gray.500" fontSize="sm">{price}</Text>
      </Box>
    )
  }
  return (
    <Link href={`/orders/${id}`}>
      <a>
        <Box border="1px" borderColor="gray.500" borderRadius="md">
          <Text>{title}</Text>
          <Text color="gray.500" fontSize="sm">{price}</Text>
        </Box>
      </a>
    </Link>
  )
}

export default Order