import Link from "next/link";

import { useOrder } from "@/lib/orders-hooks";
import Cookies from "js-cookie";
import { useEffect } from "react";
// import Service from 'services/service'
import Button from "@/components/button";
// import OrderService from 'services/OrderService'
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   PDFViewer,
// } from "@react-pdf/renderer";

import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("@/components/MyDocument"), {
  ssr: false,
});

export default function IndexPage() {
  // const { orders, isLoading, isError } = useOrders({
  //   revalidateIfStale: false,
  //   revalidateOnFocus: false,
  //   revalidateOnReconnect: false,
  // });

  const { order, isLoading, isError } = useOrder({
    id: 5397976177,
    options: {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  });

  console.log(order);

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (!token) {
      Cookies.set(
        "access_token",
        "APP_USR-8756892310430960-041004-567c330313e0f421fa46e2380411c3f6-166877629"
      );
    }
  }, []);

  // console.log(orders, isLoading, isError);

  // if (isLoading) {
  //   return <p>Cargando...</p>;
  // }

  // Create styles
  // const styles = StyleSheet.create({
  //   page: {
  //     flexDirection: "row",
  //     backgroundColor: "#E4E4E4",
  //   },
  //   section: {
  //     margin: 10,
  //     padding: 10,
  //     flexGrow: 1,
  //   },
  // });

  // Create Document Component
  // const MyDocument = () => (
  //   <Document>
  //     <Page size="A4" style={styles.page}>
  //       <View style={styles.section}>
  //         <Text>Section #1</Text>
  //       </View>
  //       <View style={styles.section}>
  //         <Text>Section #2</Text>
  //       </View>
  //     </Page>
  //   </Document>
  // );

  return (
    <>
      <h1>Restart token</h1>
      <h2>Restart token</h2>
      <Link href="/login">
        <a>
          <Button>Ir a loginss</Button>
        </a>
      </Link>
      <Link href="/orders">
        <a>
          <Button>Ir a ordenes</Button>
        </a>
      </Link>
      <h3>Restart token</h3>
      {!isLoading && !isError && <DynamicComponent order={order} />}
      {/* <PDFViewer>
        <MyDocument />
      </PDFViewer> */}
    </>
  );
}
