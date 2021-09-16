import useSWR from 'swr'
import { fetcher } from './utilities'

export function useProducts() {
  const { data, error } = useSWR(`/api/get-products`, fetcher)

  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
  }
}

// export function useProduct(id: string) {
//   return useSWR(`/api/get-entry?id=${id}`, fetcher)
// }
