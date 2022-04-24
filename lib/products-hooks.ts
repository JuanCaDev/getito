import useSWR from 'swr'

export function useProducts({ options = {} }) {
  const { data, error } = useSWR(`/sites/MCO/search?seller_id=${process.env.NEXT_PUBLIC_ML_SELLER_ID}`, options)

  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useProduct(id: string) {
  const { data, error } = useSWR(`/items/${id}`)

  return {
    product: data,
    isLoading: !error && !data,
    isError: error,
  }
}
