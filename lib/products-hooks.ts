import useSWR from 'swr'

export function useProducts({ options = {} }) {
  const { data, error } = useSWR(`/sites/MCO/search?seller_id=${process.env.NEXT_PUBLIC_ML_SELLER_ID}`, options)

  console.log(data, error)

  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useProduct(id: string) {
  const { data, error } = useSWR(`/items/${id}`)

  console.log(data, error)

  return {
    product: data,
    isLoading: !error && !data,
    isError: error,
  }
}
