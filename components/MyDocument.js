import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

import Table from "@/components/pdf/table/index.js";

// Create styles
const styles = StyleSheet.create({
  container: {
    padding: "40px",
  },
  borderTop: {
    width: "100%",
    height: "10px",
    backgroundColor: "#1EAAF1",
  },
  viewer: {
    width: "100%",
    height: "100vh",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    flexGrow: 1,
  },
  sectionRight: {
    display: "flex",
    alignItems: "flex-end",
  },
  textSm: {
    fontSize: 11,
  },
  textMd: {
    fontSize: 12,
  },
  textL: {
    fontSize: 14,
  },
  textBold: {
    fontWeight: "bold",
  },
  textRight: {
    textAlign: "center",
    float: "right",
  },
  textStore: {
    marginBottom: 10,
  },
});

// Create Document Component
function MyDocument({ order }) {
  return (
    <>
      Holaaaaaaaaaaaa
      <PDFViewer style={styles.viewer}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.borderTop}></View>
            <View style={styles.container}>
              <View style={styles.info}>
                <View style={styles.section}>
                  <Text
                    style={[styles.textStore, styles.textL, styles.textBold]}
                  >
                    Getito.co - Tienda Online
                  </Text>
                  <View style={styles.textSm}>
                    <Text>Manzana G, Casa 17, Urbanización Isamar</Text>
                    <Text>Aguachica, Cesar</Text>
                    <Text>{order.seller.phone.number}</Text>
                    <Text>getitoco@gmail.com</Text>
                  </View>
                </View>

                <View
                  style={[styles.section, styles.textMd, styles.sectionRight]}
                >
                  <Text style={styles.textRight}>VENTA #{order.id}</Text>
                  <Text style={{ textAlign: "center" }}>Fecha</Text>
                  <Text>{order.date_closed}</Text>
                </View>
              </View>

              <View style={{}}>
                <View
                  style={{
                    flexDirection: "row",
                    fontSize: "14px",
                    marginTop: "40px",
                  }}
                >
                  <Text style={{ width: "50%" }}>Artículo</Text>
                  <Text style={{ width: "10%" }}>Precio</Text>
                  <Text style={{ width: "15%" }}>Cantidad</Text>
                  <Text style={{ width: "15%" }}>Total</Text>
                </View>

                {order.order_items.map((order_item) => (
                  <View
                    style={{
                      flexDirection: "row",
                      fontSize: "12px",
                      marginTop: "40px",
                    }}
                  >
                    <Text style={{ width: "50%" }}>{order_item.item.title}</Text>
                    <Text style={{ width: "10%" }}>{order_item.unit_price}</Text>
                    <Text style={{ width: "15%" }}>{order_item.quantity}</Text>
                    <Text style={{ width: "15%" }}>{order_item.unit_price * order_item.quantity}</Text>
                  </View>
                ))}
              </View>

              <Table></Table>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
}

export default MyDocument;
