import { useForm } from "hooks/useForm"
import { useRouter } from "next/router";
import { useState } from "react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
  Button,
  Text 
} from "@chakra-ui/react"

export default function LoginPage() {
  const router = useRouter()
  const { formValues, handleInputChange } = useForm({
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState("")

  const handleClick = () => {
    if (formValues.password === "pwd") {
      console.log("Sesión iniciada")
      router.push(`http://auth.mercadolibre.com.co/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_ML_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_ML_REDIRECT_URI}`)
    } else {
      console.error("Si no la sabes mejor no entres ;)")
      setErrorMessage("Si no la sabes mejor no entres ;)")
    }
  }

  return (
    <>
      <Box display="flex" alignItems="center" flexDirection="column">
        <Text fontSize="3xl" marginY="4">¡Bienvenido a la MercadoApp!</Text>
        <Box w="18rem" p={4} borderWidth="1px" borderRadius="lg">
          <FormControl id="password" isInvalid={errorMessage}>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              name="password"
              onChange={handleInputChange}
              placeholder="Ingresa la contraseña"
            />
            <FormErrorMessage>{errorMessage}</FormErrorMessage>
          </FormControl>
          <Button
            onClick={handleClick}
            colorScheme="blue"
            isFullWidth={true}
            marginTop="2"
          >
            Entrar
          </Button>
        </Box>
        {/* <div>
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="Ingresa la contraseña"
            onChange={handleInputChange}
          />
        </div> */}
        {/* <Button
          onClick={handleClick}
          colorScheme="blue"
          isFullWidth={true}
        >
          Entrar
        </Button> */}
        {/* <a onClick={handleClick} className="w-full mt-3 btn btn-primary">Entrar</a>
        <p className="mt-2 mb-0 text-danger">{errorMessage}</p> */}
      </Box>
    </>
  )
}