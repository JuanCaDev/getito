import { useEffect } from 'react'

import Cookies from 'js-cookie'
import OrderService from 'services/OrderService'

export default function OrderDetails({ initialData }) {
  console.log(initialData)
  return (
    <div>Orden</div>
  )
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  const { data } = await OrderService.getOrder(id)

  // const user = {
  //   id: dataUser.id,
  //   store: dataUser.nickname || '',
  //   fullName: `${dataUser.first_name} ${dataUser.last_name}`,
  //   email: dataUser.email,
  //   phone: dataUser.phone.number || '',
  //   permalink: dataUser.permalink,
  //   accessToken: dataToken.access_token,
  //   refreshToken: dataToken.refresh_token
  // }
  
  // await UserService.saveUser(user)

  return {
    props: {
      initialData: data,
    }
  }
}