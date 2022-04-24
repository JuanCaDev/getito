import { Text, View } from "@react-pdf/renderer";

import styles from "./styles";

const TInfoTop = ({ phoneNumber, orderId, date }) => (
  <>
    <View style={styles.infoTop}>
      <View style={styles.infoTopSection}>
        <Text style={[styles.textStore, styles.textL]}>
          Getito.co - Tienda Online
        </Text>
        <View style={[styles.textGray, styles.textSm]}>
          <Text>Manzana G, Casa 17, Urbanización Isamar</Text>
          <Text>Aguachica, Cesar</Text>
          <Text>{phoneNumber}</Text>
          <Text>getitoco@gmail.com</Text>
        </View>
      </View>

      <View style={[styles.flexRight, styles.textSm]}>
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

    <View style={[styles.infoTop, { marginTop: "20px" }]}>
      <View style={styles.infoTopSection}>
        <Text style={[styles.textStore, styles.textL]}>Facturar a</Text>
        <View style={[styles.textGray, styles.textSm]}>
          <Text>Manzana G, Casa 17, Urbanización Isamar</Text>
          <Text>Aguachica, Cesar</Text>
          <Text>{phoneNumber}</Text>
          <Text>getitoco@gmail.com</Text>
        </View>
      </View>

      <View style={styles.infoTopSection}>
        <Text style={[styles.textStore, styles.textL]}>Datos de envío</Text>
        <View style={[styles.textGray, styles.textSm]}>
          <Text>Manzana G, Casa 17, Urbanización Isamar</Text>
          <Text>Aguachica, Cesar</Text>
          <Text>{phoneNumber}</Text>
          <Text>getitoco@gmail.com</Text>
        </View>
      </View>
    </View>
  </>
);

export default TInfoTop;
