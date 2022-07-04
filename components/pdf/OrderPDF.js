import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

import TInfoTop from "@/components/pdf/TInfoTop.js";
import THead from "@/components/pdf/THead.js";
import TBody from "@/components/pdf/TBody.js";
import TOrderSummary from "@/components/pdf/TOrderSummary.js";

// Create styles
const styles = StyleSheet.create({
  container: {
    padding: "40px",
  },
  borderBlue: {
    width: "100%",
    height: "10px",
    backgroundColor: "#1EAAF1",
  },
  viewer: {
    width: "100%",
    height: "100vh",
  },
  infoTop: {
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
  textGray: {
    color: "#2E2E2E",
  },
});

// Create Document Component
function MyDocument({ order }) {
  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.borderBlue}></View>
          <View style={styles.container}>
            <TInfoTop
              phoneNumber={order.seller.phone.number}
              orderId={order.id}
              date={order.date_closed}
            />

            <View style={{}}>
              <THead />
              <TBody orderItems={order.order_items} />
              <TOrderSummary
                subtotal={order.payments[0].transaction_amount}
                coupon={order.payments[0].coupon_amount}
                shipping={order.payments[0].shipping_cost}
                total={order.payments[0].total_paid_amount}
              />
            </View>
          </View>
          <View
            style={[styles.borderBlue, { position: "absolute", bottom: "0px" }]}
          ></View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default MyDocument;
