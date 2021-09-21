import useSWR from 'swr'
import Cookies from 'js-cookie'
import resourceUrl from 'data/resourceUrl'

export function useMessagesPack({ packId, userId, options = {} }) {
  console.log("useMessagesPack", { packId, userId })
  const token = Cookies.get('access_token') || ""
  console.log(token)
  const { data, error } = useSWR(
    `${resourceUrl.messagePack}/packs/${packId}/sellers/${userId}?mark_as_read=false`,
    options
  );

  console.log("useSWR", data, error)

  return {
    messagesPack: data,
    isLoading: !error && !data,
    isError: error,
  }
}