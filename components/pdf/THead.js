import { Text, View } from "@react-pdf/renderer";

import styles from "./styles";

const THead = () => (
  <View style={styles.thead}>
    <Text style={styles.col1}>Artículo</Text>
    <Text style={styles.col2}>Precio</Text>
    <Text style={styles.col3}>Cantidad</Text>
    <Text style={styles.col4}>Total</Text>
  </View>
);

export default THead;
