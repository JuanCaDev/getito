import useSWR from 'swr'

const resource = '/orders'

export function useOrders({ limit = 10, offset = 0, options = {} }) {
  console.log("offset", offset)
  const { data, error } = useSWR(
    `${resource}?limit=${limit}&offset=${offset}`,
    options
  );

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error
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