import Button from '@/components/button'
import { Text } from '@chakra-ui/layout'
import { Box, Input } from '@chakra-ui/react'
import ProductService from 'services/ProductService'

import { parseCookies } from 'nookies'

import { Container } from "@nextui-org/react";
import { Pagination } from '@nextui-org/react';
import { useRouter } from 'next/router'
import { formatToCOP, convertUSDToCOP, percentageOfProfit, saleProfit, percentageOfProfitMeli, saleProfitMeli } from '@/lib/utils'
import Image from 'next/image'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import Cookies from 'js-cookie'
import Barcode from 'react-barcode/lib/react-barcode'

export default function OrdersPage() {
  const router = useRouter();

  const [product, setProduct] = useState(null)

  const formikSKU = useFormik({
    initialValues: {
      sku: ''
    },
    validationSchema: Yup.object({
      sku: Yup.string()
    }),
    onSubmit: async (values) => {
      console.log(values)
      const { data } = await ProductService.getProductBySKU({ sku: values.sku });
      console.log(data.results[0])

      const TOKEN = Cookies.get('access_token')
      const { data: dataItem } = await Axios.get(`https://api.mercadolibre.com/items?ids=${data.results[0]}&attributes=id,title,price,base_price,original_price,available_quantity`, 
        {
          headers: {  
            'Authorization': `Bearer ${TOKEN}`
          }
        }
      )

      setProduct({
        ...dataItem[0].body,
        sku: values.sku
      })
    },
  })
  
  const onPrintBarcode = () => {
    var container = document.getElementById("div-barcode");
    // var mySVG = document.getElementById("barcode-canvas");
    // var width = "200px";
    // var height = "100px";
    // var printWindow = window.open('', 'PrintMap',
    // 'width=' + width + ',height=' + height);
    // printWindow.document.write(container.innerHTML);
    // printWindow.document.close();
    // printWindow.print();
    // printWindow.close()
    var ventana = window.open('', 'PrintMap', 'height=600,width=800');
    // ventana.document.write('<html><head><title>' + document.title + '</title>');
    // ventana.document.write('</head><body >');
    ventana.document.write(container.innerHTML);
    // ventana.document.write('</body></html>');
    ventana.document.close();
    ventana.focus();
    ventana.print();
    ventana.close();
    return true;
  }
  
  return (
    <Container>
      <Text fontSize="xl" as="h1" fontWeight="semibold">Buscar por sku</Text>
      <Box bg='white' w='100%' rounded='md'>
        <form onSubmit={formikSKU.handleSubmit}>
          <Input
            label="SKU"
            id="sku"
            name="sku"
            type="text"
            onChange={formikSKU.handleChange}
            onBlur={formikSKU.handleBlur}
            value={formikSKU.values.sku}
            placeholder="Buscar por SKU"
          />
          <Button className='inline-block ml-2 align-bottom' auto type='submit'>Traer</Button>
        </form>
        {product?.sku && (  
          <div id="div-barcode"
            style={{
              maxHeight: "94px",
              maxWidth: "204px",
            }}
          >
            <Barcode
              value={product?.sku}
              format="CODE128"
              textAlign="left"
              height={40}
              width={2.5}
              margin={0}
            />
            <p>{product?.title.substring(0, 40) + "..."}</p>
          </div>
        )}
        
        <button onClick={onPrintBarcode} style={{ marginTop: "20px", padding: "10px"}}>Imprimir</button>
      </Box>


    </Container>
  )
}