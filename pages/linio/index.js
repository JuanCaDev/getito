import Link from 'next/link'

import { useOrders } from '@/lib/orders-hooks'

import Orders from '@/components/orders'
import Button from '@/components/button'
import { Text } from '@chakra-ui/layout'
import OrderService from 'services/OrderService'

import { parseCookies } from 'nookies'

import { Container } from "@nextui-org/react";
import { Pagination } from '@nextui-org/react';
import { useRouter } from 'next/router'

import crypto from 'crypto'
import axios from 'axios'

export default function OrdersPage({ initialData }) {
  const router = useRouter();

  const currentPage = Number(router.query.page)
  // 10 = limit
  const offset = currentPage === 1 ? 0 : 10 * (currentPage - 1)

  const orders = initialData

  const handleChangePagination = (page) => {
    router.query.page = page
    router.push({
      pathname: router.pathname,
      query: router.query,
    });
  }
  
  return (
    <Container>
      Linio
    </Container>
  )
}

export const getServerSideProps = async (ctx) => {
  const { access_token } = parseCookies(ctx)
  const { page } = ctx.query
  const limit = 10
  try {
    const hash = crypto.createHash('sha256')
    const finalHex = hash.update('hola').digest('hex')

    console.log(finalHex)

    const timestamp = new Date().toISOString()
    // const userId = 'CO5YUF0'
    const userId = 'juancafelizzola@gmail.com'
    const version = '1.0'
    const action = 'GetProducts'

    const parameters = {
      'UserID': userId,
      'Version': version,
      'Action': action,
      'Format':'XML',
      'Timestamp': timestamp
    }

    let sortableParameters = [];
    for (const parameter in parameters) {
      sortableParameters.push([parameter, parameters[parameter]]);
    }

    // sortableParameters.sort(function(a, b) {
    //     return a[1] - b[1];
    // });

    sortableParameters.sort((a, b) => (a[0] > b[0]) ? 1 : -1)

    console.log('sortableParameters', sortableParameters)

    console.log('sortableParameters ecoded', encodeURIComponent(sortableParameters))

    let encoded = []

    for (const property in sortableParameters) {
      encoded.push(`${encodeURIComponent(property)}=${encodeURIComponent(parameters[property])}`)
    }

    console.log('encoded', encoded)

    const concatenated = encoded.join('&')

    console.log('concatenated', concatenated)

    // encodeURIComponent
    const apikey = 'c40bd7a7995b0b10aaecf2aa9eae6b7a35daf5ea'

    // const signature = crypto.createHmac("sha256", apikey).update(concatenated).digest().toString('base64');
    const signature = crypto.createHmac("sha256", apikey).update(concatenated).digest('hex');

    console.log('signature', signature)

    console.log('url', `https://sellercenter-api.linio.com.co/?Action=GetProducts&Timestamp=${timestamp}&UserID=${userId}&Version=${version}&Signature=${signature}`)

    // const { data } = await axios.get(`https://sellercenter-api.linio.com.co/?Action=GetProducts&Timestamp=${timestamp}&UserID=${userId}&Version=${version}&Signature=${signature}`)
    // console.log('data', data)
    // fetch(`https://sellercenter-api.linio.com.co/?Action=GetProducts&Timestamp=${timestamp}&UserID=${userId}&Version=${version}&Signature=${signature}`)
    //   .then(response => response.json())
    //   .then(data => console.log('data', data))
    //   .catch((error) => console.error('error', error))
    
    return {
      props: {
        initialData: ''
      }
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true
    }
  }
}