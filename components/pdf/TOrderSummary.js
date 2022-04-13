import { Text, View } from "@react-pdf/renderer";

import { formatterToCOP } from "@/lib/money";

import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  trow: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: "12px",
    padding: "2px 4px",
  },
  trowName: {
    color: "#2E2E2E",
  },
  trowValue: {
    color: "#000",
  },
});

const TRow = ({ name, value }) => (
  <View style={styles.trow}>
    <Text style={styles.trowName}>{name}</Text>
    <Text style={styles.trowValue}>
      {name === "Envío"
        ? value === 0
          ? "Gratis"
          : formatterToCOP.format(value)
        : formatterToCOP.format(value)}
    </Text>
  </View>
);

const TOrderSummary = ({ subtotal, coupon, shipping, total }) => (
  <View
    style={{
      fontSize: "12px",
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: "4px",
    }}
  >
    <View
      style={{
        width: "40%",
      }}
    >
      <TRow name="Subtotal" value={subtotal} />
      <TRow name="Descuento" value={coupon} />
      <TRow name="Envío" value={shipping} />
      <View
        style={{ borderBottom: "1px solid #7A7A7A", margin: "4px 0" }}
      ></View>
      <TRow name="Total" value={total} />
    </View>
  </View>
);

export default TOrderSummary;
