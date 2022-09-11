import Link from 'next/link'

import { useOrders } from '@/lib/orders-hooks'

import Orders from '@/components/orders'
import Button from '@/components/button'
import { Text } from '@chakra-ui/layout'
import { Box } from '@chakra-ui/react'
import ProductService from 'services/ProductService'

import { parseCookies } from 'nookies'

import { Container } from "@nextui-org/react";
import { Pagination } from '@nextui-org/react';
import { useRouter } from 'next/router'
import { formatToCOP, convertUSDToCOP, percentageOfProfit, saleProfit } from '@/lib/utils'
import Image from 'next/image'
import Axios from 'axios'
import { useEffect } from 'react'

export default function OrdersPage({ initialData, dataSheets, accessToken }) {
  const router = useRouter();

  console.log(initialData, dataSheets, accessToken)

  // const currentPage = Number(router.query.page)
  // 10 = limit
  // const offset = currentPage === 1 ? 0 : 10 * (currentPage - 1)

  // const orders = initialData

  // console.log(isLoading, isError)

  // if (isLoading) {
  //   return <p>Cargando...</p>
  // }

  // if (isError) {
  //   return (
  //     <Container>
  //       <h1 className="text-xl font-semibold">Ordenes</h1>
  //       <p>No se inició sesión correctamente...</p>
  //       <Link href="/login">
  //         <a>
  //           <Button>Ir a login</Button>
  //         </a>
  //       </Link>
  //     </Container>
  //   )
  // }

  // const handleChangePagination = (page) => {
  //   router.query.page = page
  //   router.push({
  //     pathname: router.pathname,
  //     query: router.query,
  //   });
  // }

  const getPrices = async (price, categoryId) => {
    if (price && categoryId) {
      try {
        const { data: dataListingPrice } = await ProductService.getListingPrices({
          token: accessToken,
          price: price,
          categoryId: categoryId
        })
    
        console.log(dataListingPrice)
      } catch (error) {
        console.error(error)
      }
    }

    return "HOla"
  }

  useEffect(() => {
    initialData.results.forEach(async (result) => {
      getPrices(result.price, result.category_id)
    })
  }, [])
  
  
  return (
    <Container>
      <Text fontSize="xl" as="h1" fontWeight="semibold">Publicaciones</Text>
      <Box bg='white' w='100%' rounded='md'>
        {initialData?.results?.map(product => {
          const purchasePriceCOP = convertUSDToCOP(product.purchasePrice)
          return (
          <Box w='100%' p={4} key={product.id} display='grid' gridTemplateColumns='auto 1fr' columnGap='4'>
            <Image src={product.thumbnail} width={72} height={72} />
            <div>
              <Text>{product.title}</Text>
              <Text>Venta: {formatToCOP(product.price)}</Text>
              {product.purchasePrice > 0 && <>
                <Text>Compra: {formatToCOP(purchasePriceCOP)} - USD ${product.purchasePrice}</Text>
                {/* {getPrices(product.price, product.category_id)} */}
                <Text>
                  Ganancia: {percentageOfProfit(product.price, purchasePriceCOP)} %
                  - {formatToCOP(saleProfit(product.price, purchasePriceCOP))}
                </Text>
              </>}
              
            </div>
          </Box>
        )
        })}
      </Box>
      {/* <Orders orders={orders.results} />
      <div className="py-3">
        <Pagination
          total={orders.paging.total}
          initialPage={1}
          page={currentPage}
          onChange={handleChangePagination}
        />
      </div> */}
    </Container>
  )
}

export const getServerSideProps = async (ctx) => {
  const { access_token } = parseCookies(ctx)
  const { page } = ctx.query
  const limit = 10
      
  try {
    const offset = page === 1 ? 0 : (page - 1) * limit;
    const { data: dataProducts } = await ProductService.getProducts({
      token: access_token,
      offset: offset,
    })

    const idSheets = process.env.NEXT_PUBLIC_SHEETS_ID
    const apiKey = process.env.NEXT_PUBLIC_SHEETS_API_KEY
    const rangeValues = process.env.NEXT_PUBLIC_SHEETS_RANGE

    const { data: dataSheets } = await Axios.get(`https://content-sheets.googleapis.com/v4/spreadsheets/${idSheets}/values/${rangeValues}?access_token=${apiKey}&key=${apiKey}`)
    
    // console.log(dataProducts.results)
    // console.log(dataSheets)
    // const initialData = dataProducts.results.map(({ price }) => value.value)

    const initialData = {
      ...dataProducts,
      results: dataProducts.results.map((result) => {
        const dataSheet = dataSheets.values.filter((sheet) => sheet[0] === result.id)
        console.log(dataSheet)
        
        return {
          ...result,
          purchasePrice: dataSheet.length > 0 ? dataSheet[0][3] : 0
        }
        
      })
    }
    
    return {
      props: {
        initialData: initialData,
        dataSheets: dataSheets,
        accessToken: access_token
      }
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true
    }
  }
}