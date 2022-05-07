import { useEffect, useState } from 'react'
import Link from 'next/link'

import Container from '@/components/container'
import { useProducts } from '@/lib/products-hooks'

import ProductService from '@/services/ProductService'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { Button, Grid, Input, Text } from '@nextui-org/react'
import Axios from 'axios'

export default function AmazonProductPage() {
  // console.log(product)
  const [loadingDataFormat, setLoadingDataFormat] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    price: null
  })

  const formik = useFormik({
    initialValues: formData,
    validationSchema: Yup.object({
      title: Yup.string(),
      price: Yup.number()
    }),
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  })
  
  const formikSKU = useFormik({
    initialValues: {
      sku: ''
    },
    validationSchema: Yup.object({
      sku: Yup.string()
    }),
    onSubmit: async (values) => {
      setLoadingDataFormat(true)
      const { data } = await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/amazon/products/${values.sku}`)
      console.log(data)
      setFormData(data)
      formik.setValues(data)
      setLoadingDataFormat(false)
    },
  })
  
  const DataForm = () => {
    if (loadingDataFormat) {
      return <Text>Cargando datos de amazon en formulario...</Text>
    }
    
    return (
      <form onSubmit={formik.handleSubmit}>
        <Grid.Container>
          <Grid xs={4}>
            <Input
              label="Título"
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              placeholder="Ingresa el título"
            />
          </Grid>
          <Grid xs={4}>
            <Input
              label="Precio"
              id="price"
              name="price"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              placeholder="Ingresa el precio"
            />
          </Grid>
          <Grid xs={4}>
            
          </Grid>
          <Grid xs={12}>
            <Button className='inline-block' auto type='submit'>Publicar</Button>
          </Grid>
        </Grid.Container>
      </form>
    )
  }
  
  return (
    <Container>
      <form onSubmit={formikSKU.handleSubmit}>
        <Input
          label="SKU"
          id="sku"
          name="sku"
          type="text"
          onChange={formikSKU.handleChange}
          onBlur={formikSKU.handleBlur}
          value={formikSKU.values.sku}
          placeholder="Next UI"
        />
        <Button className='inline-block ml-2 align-bottom' auto type='submit'>Traer</Button>
      </form>
      <Text h1>Productos</Text>
      <DataForm />
    </Container>
  )
}

// export const getServerSideProps = async (ctx) => {
//   const product = await ProductScrapperService.getProduct({ sku: 'B07SJR6HL3' })

//   console.log(product)

//   return {
//     props: {
//       product,
//     }
//   }
// }