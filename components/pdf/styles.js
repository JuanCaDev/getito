import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  infoTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoTopSection: {
    display: "flex",
    justifyContent: "space-between",
  },
  flexRight: {
    display: "flex",
    alignItems: "flex-end",
  },
  textXs: {
    fontSize: 9,
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
  textStore: {
    marginBottom: 10,
  },
  textGray: {
    color: "#2E2E2E",
  },
  textGrayLight: {
    color: "#7A7A7A",
  },
  thead: {
    flexDirection: "row",
    fontSize: "12px",
    marginTop: "40px",
    borderTop: "1px solid #7A7A7A",
    borderBottom: "1px solid #7A7A7A",
    padding: "4px",
  },
  tbody: {
    flexDirection: "row",
    fontSize: "11px",
    borderBottom: "1px solid #7A7A7A",
    padding: "4px",
    color: "#2E2E2E",
  },
  col1: {
    width: "50%",
    padding: "0px 4px",
  },
  col2: {
    width: "19%",
    padding: "0px 4px",
    textAlign: "center",
  },
  col3: {
    width: "12%",
    padding: "0px 4px",
    textAlign: "center",
  },
  col4: {
    width: "19%",
    padding: "0px 4px",
    textAlign: "right",
  },
});

export default styles;
