import Link from "next/link"

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
import { Button, Textarea } from "@chakra-ui/react"

import * as Yup from 'yup';
import { useForm } from "hooks/useForm"
import { useState } from "react"
import { convertToCOP } from "@/lib/utils"
import MessageService from "services/MessageService"


const messageSchema = Yup.object().shape({
  msg: Yup.string()
    .min(2, '¡Muy corto!')
    .max(350, '¡Muy largo!')
    .required('Required')
});

function Order({ order }) {
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
        msg = `Hola, ${clientName}. ¡Gracias por tu compra! Estamos preparando tu pedido para ser despachado. Si tienes alguna duda o te gustaría adquirir otro producto, puedes contactarnos al 3182668191.`
        break;

      case shorcuts.airdots:
        msg = `Hola, ${clientName}. ¡Gracias por tu compra! Queremos informarte que tenemos fundas protectoras para tus airdots. Si estás interesado/a puedes contactarnos al 3182668191.`
        break;

      case shorcuts.miband:
        msg = `Hola, ${clientName}. ¡Gracias por tu compra! Queremos informarte que tenemos correas de colores, correas de acero y protectores adicionales para tu mi band. Si estás interesado/a puedes contactarnos al 3182668191.`
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
        const { data } = await MessageService.send({
          packId: order.pack_id || order.id,
          sellerId: order.seller.id,
          buyerId: order.buyer.id,
          text: values.msg
        })
        console.log(data)
      })
      .catch((err) => setErrorMsg(err.message))
  }

  

  return (
    <>
      {order.order_items.map((order_item) => (
        <Box border="2px" borderColor="gray.500" borderRadius="md" px="3" py="2" key={order.id}>
          <Link href={`/orders/${order.id}`}>
            <a>
              <Text>{order_item.item.title}</Text>
              <Text color="gray.500" fontSize="sm">{convertToCOP(order_item.full_unit_price)} x {order_item.quantity}</Text>
            </a>
          </Link>
          <Button size="sm" variant="link" colorScheme="telegram" onClick={onOpen}>
            Enviar mensaje
          </Button>
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