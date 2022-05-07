import { SWRConfig } from 'swr'
// import Footer from '@/components/footer'
import { ChakraProvider } from "@chakra-ui/react"
import { Box } from '@chakra-ui/layout'
import Axios from 'axios'
import Cookies from 'js-cookie'
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import '../styles/index.css'
import Nav from '@/components/nav'
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

Axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function App({ Component, pageProps }) {
  const accessToken = Cookies.get('access_token') || "";

  const darkTheme = createTheme({
    type: 'dark'
  })

  return (
    <>
      <SWRConfig
        value={{
          fetcher: (url, headersValue) =>
            Axios(url, {
              headers: {
                "authorization": 'Bearer ' + accessToken,
                ...headersValue
              }
            }).then((r) => r.data),
        }}
      >
        <NextThemesProvider
          defaultTheme="dark"
          attribute='class'
          value={{
            dark: darkTheme.className
          }}
        >
          <NextUIProvider>
            <ChakraProvider>
              <Box bg="blue.900" minHeight="100vh">
                <Nav />
                <Component {...pageProps} />
              </Box>
              {/* <Footer /> */}
            </ChakraProvider>
          </NextUIProvider>
        </NextThemesProvider>
      </SWRConfig>
    </>
  )
}