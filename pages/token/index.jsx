import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect } from "react";
import TokenService from "services/TokenService";
import UserService from "services/UserService";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function TokenPage({ responseToken, responseUser }) {
  useEffect(() => {
    Cookies.set("access_token", responseToken.access_token, { expires: 0.25 }); // 6 hours
  }, []);

  const copyToken = () => {
    navigator.clipboard.writeText(responseToken.access_token);
  }


  return (
    <>
      <h1>
        ¡Haz iniciado correctamente!{" "}
        <span onClick={copyToken} style={{ cursor: "pointer" }}>Token: {responseToken.access_token}</span>
      </h1>
      <Link href="/">
        <a>
          <Button>Ir a publicaciones</Button>
        </a>
      </Link>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const { code } = ctx.query;

  const dataToken = await TokenService.getAccessToken(code);
  const dataUser = await UserService.getUser(dataToken.access_token);

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
      responseToken: dataToken,
      responseUser: dataUser,
    },
  };
};
