import { SWRConfig } from 'swr'
// import Footer from '@/components/footer'
import { ChakraProvider } from "@chakra-ui/react"
import { Box } from '@chakra-ui/layout'
import Axios from 'axios'
import Cookies from 'js-cookie'

import '../styles/index.css'

Axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

function MyApp({ Component, pageProps }) {
  const accessToken = Cookies.get('access_token') || "";

  return (
    <>
      <SWRConfig
        value={{
          fetcher: (url, headersValue) =>
            Axios(url, {
              headers: {
                "Authorization": 'Bearer ' + accessToken,
                // "Access-Control-Allow-Origin": "*",
                ...headersValue
              }
            }).then((r) => r.data),
        }}
      >
        <ChakraProvider>
          <Box bg="gray.100">
            <Component {...pageProps} />
          </Box>
          {/* <Footer /> */}
        </ChakraProvider>
      </SWRConfig>
    </>
  )
}

export default MyApp
