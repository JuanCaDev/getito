import { Text, View } from "@react-pdf/renderer";

import { formatterToCOP } from "@/lib/money";

import styles from "./styles";

const TBody = ({ orderItems }) => (
  <>
    {orderItems.map((order_item) => (
      <View style={styles.tbody} key={order_item.item.id}>
        <Text style={styles.col1}>
          {order_item.item.title}
          {" | "}
          {order_item.item.variation_attributes.map((attribute) => (
            <Text
              key={attribute.id}
              style={[styles.textGrayLight, styles.textXs]}
            >
              {attribute.name}: {attribute.value_name}
            </Text>
          ))}
        </Text>
        <Text style={styles.col2}>
          {formatterToCOP.format(order_item.unit_price)}
        </Text>
        <Text style={styles.col3}>{order_item.quantity}</Text>
        <Text style={styles.col4}>
          {formatterToCOP.format(order_item.unit_price * order_item.quantity)}
        </Text>
      </View>
    ))}
  </>
);

export default TBody;
