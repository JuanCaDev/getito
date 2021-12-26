import useSWR from 'swr'
import Cookies from 'js-cookie'

const resource = '/orders'

export function useOrders({ options = {} }) {
  const { data, error } = useSWR(
    `${resource}/search?seller=${process.env.NEXT_PUBLIC_ML_SELLER_ID}&limit=20&sort=date_desc`,
    options
  );

  console.log(data, error)

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useOrder({ id, options = {} }) {
  const { data, error } = useSWR(`${resource}/${id}`, options);

  return {
    order: data,
    isLoading: !error && !data,
    isError: error,
  }
}