import { SWRConfig } from 'swr'
// import Footer from '@/components/footer'
import { ChakraProvider } from "@chakra-ui/react"
import { Box } from '@chakra-ui/layout'
import Axios from 'axios'
import Cookies from 'js-cookie'

import '../styles/index.css'
import Nav from '@/components/nav'
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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
                // "Content-Type": "application/json;charset=utf-8",
                // "Transfer-Encoding": "chunked",
                // "Connection": "keep-alive",
                // "vary": "accept-encoding",
                // "content-encoding": "gzip",
                // "X-Content-Type-Options": "nosniff",
                // "Access-Control-Allow-Headers" : "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS, POST, GET, DELETE",
                // "Access-Control-Max-Age": "86400",
                // "Content-Type": "text/event-stream",
                // "Cache-Control": "no-cache",
                // "Connection": "keep-alive",
                // "X-Accel-Buffering": "no",
                ...headersValue
              }
            }).then((r) => r.data),
        }}
      >
        <ChakraProvider>
          <Box bg="gray.100" minHeight="100vh">
            <Nav />
            <Component {...pageProps} />
          </Box>
          {/* <Footer /> */}
        </ChakraProvider>
      </SWRConfig>
    </>
  )
}

export default MyApp
