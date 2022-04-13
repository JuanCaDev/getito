import { Text, View } from "@react-pdf/renderer";

import styles from "./styles";

const TInfoTop = ({ phoneNumber, orderId, date }) => (
  <View style={styles.info}>
    <View style={styles.section}>
      <Text style={[styles.textStore, styles.textL, styles.textBold]}>
        Getito.co - Tienda Online
      </Text>
      <View style={styles.textSm}>
        <Text>Manzana G, Casa 17, Urbanización Isamar</Text>
        <Text>Aguachica, Cesar</Text>
        <Text>{phoneNumber}</Text>
        <Text>getitoco@gmail.com</Text>
      </View>
    </View>

    <View style={[styles.section, styles.textSm, styles.sectionRight]}>
      <Text>VENTA #{orderId}</Text>
      <Text>Fecha</Text>
      <Text style={styles.textGray}>
        {new Date(date).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </Text>
    </View>
  </View>
);

export default TInfoTop;
