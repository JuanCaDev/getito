import useSWR from 'swr'

const resource = '/orders'

export function useOrders({ options }) {
  const { data, error } = useSWR(
    `${resource}/search?seller=${process.env.NEXT_PUBLIC_ML_SELLER_ID}&limit=10&sort=date_desc`,
    options
  );

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
  }
}