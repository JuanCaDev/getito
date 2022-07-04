import NextLink from "next/link"

import { Box, Text } from "@chakra-ui/layout"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/hooks"
import { Button, Textarea, Link } from "@chakra-ui/react"

import * as Yup from 'yup';
import { useForm } from "hooks/useForm"
import { useState } from "react"
import { convertToCOP } from "@/lib/utils"
import MessageService from "services/MessageService"
import { useProduct } from "@/lib/products-hooks"
import serviceMl from "serviceMl"

const messageSchema = Yup.object().shape({
  msg: Yup.string()
    .min(2, '¡Muy corto!')
    .max(350, '¡Muy largo!')
    .required('Required')
});

function Order({ order }) {
  const { product, isLoading: isLoadingProduct, isError} = useProduct(order.order_items[0].item.id)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { formValues, handleInputChange, handleEditValues } = useForm({
    msg: ''
  })
  const [errorMsg, setErrorMsg] = useState("")

  const shorcuts = {
    'gracias': '/gracias',
    'airdots': '/airdots',
    'miband': '/miband',
  }

  const writeShorcut = (shorcut, clientName) => {
    let msg = '';
    switch (shorcut) {
      case shorcuts.gracias:
        msg = `Hola. ¡Gracias por tu compra!\nEstamos preparando tu pedido para ser despachado.\nSi tienes alguna duda o te gustaría adquirir otro producto, puedes escribirnos al wap 3182668191 donde ofrecemos descuentos y más.\nSomos Getito`
        break;
    
      default:
        break;
    }

    handleEditValues({
      ...formValues,
      'msg': msg
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    messageSchema.validate({ msg: formValues.msg })
      .then(async (values) => { 
        setErrorMsg("")
        const packId = order.pack_id || order.id
        const { data } = await serviceMl.post(`/messages`, {
          packId: packId,
          text: values.msg
        })

        console.log(data)
      })
      .catch((err) => setErrorMsg(err.message))
  }


  return (
    <>
      {order.order_items.map((order_item) => (
        <Box bg="white" boxShadow="sm" borderRadius="md" px="3" py="2" key={order.id}>
          <NextLink href={`/orders/${order.id}`}>
            <a>
              <Text lineHeight="initial" mb="1">{order_item.item.title}</Text>
              <Text color="gray.500" fontSize="sm">SKU {order_item.item.seller_sku}</Text>
              <Text color="gray.500" fontSize="sm">
                {convertToCOP(order_item.full_unit_price)} x{" "}
                <Text as="span" color={order_item.quantity > 1 && "black"}>{order_item.quantity}</Text>
                {!isLoadingProduct && product.available_quantity < 4 && (
                  <Text as="span" color={product.available_quantity > 1 ? "orange.400" : "red.400"}>
                    {` ¡Quedan ${product.available_quantity} ${product.available_quantity === 1 ? "unidad" : "unidades"}!` }
                  </Text>
                )}
              </Text>
            </a>
          </NextLink>
          <Box display="flex" justifyContent="space-between" mt="2">
            <Button size="sm" variant="link" colorScheme="telegram" onClick={onOpen}>
              Enviar mensaje
            </Button>
            {order.status === "cancelled" && (
              <Box bg="gray.300" rounded="full" px="2">
                <Text color="gray.600" fontSize="xs">Cancelada</Text>
              </Box>
            )}
            <Link colorScheme="telegram" fontSize="sm" fontWeight="semibold" color="telegram.500" href={`https://www.amazon.com/dp/${order_item.item.seller_sku}`} isExternal>
              Ver en Amazon
            </Link>
          </Box>
        </Box>
      ))}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Escribir mensaje</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              id="msg"
              name="msg"
              onChange={handleInputChange}
              value={formValues.msg}
            />
            {errorMsg && <Text colorScheme="red" fontSize="xs" color="red.500" mb={2}>{errorMsg}</Text>}
            {Object.keys(shorcuts).map((shorcut) => (
              <Button
                key={shorcut}
                colorScheme="gray"
                mr={3}
                onClick={() => writeShorcut(shorcuts[shorcut], order.buyer.nickname)}
                size="xs"
                rounded="full"
              >
                {shorcuts[shorcut]}
              </Button>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} variant="ghost">
              Close
            </Button>
            <Button colorScheme="blue" onClick={onSubmit}>Enviar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Order