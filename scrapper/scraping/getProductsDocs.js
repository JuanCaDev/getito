import Axios from 'axios'
import { writeDBFile } from "./db/index.js";

const idSheets = '1cgAdyQYnlNPlw4MqZ_0VFo_bjh_k05RF3UHmCgUA4KU'
const apiKey = 'AIzaSyCtesM7XsnxPu6Sax4L4kM2gs5jWLZRT4c'
const rangeValues = 'A2:AZ100'
const { data } = await Axios.get(`https://content-sheets.googleapis.com/v4/spreadsheets/${idSheets}/values/${rangeValues}?access_token=${apiKey}&key=${apiKey}`)

const products = data.values.map((row) => ({
  id: row[0],
  sku: row[1],
  title: row[2],
  priceUSD: parseFloat(row[3]),
  salePrice: row[4] && parseFloat(row[4]),
}))

console.log(products)

writeDBFile('productsDocs', products)