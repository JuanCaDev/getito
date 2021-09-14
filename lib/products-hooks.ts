import useSWR from 'swr'

function fetcher(url: string) {
  return window.fetch(url).then((res) => res.json())
}

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
