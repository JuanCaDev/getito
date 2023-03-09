import Axios from 'axios'

import { writeDBFile } from "./scraping/db/index.js";
import { getProduct } from "./ProductScrapperService.js";

function sleep(t) {
  return new Promise(function(resolve) {
    setTimeout(resolve, t);
  });
};

// const product = await getProduct()

try {
  // const product = await ProductScrapperService.getProduct({ sku: req.query.id })
  const idSheets = '1cgAdyQYnlNPlw4MqZ_0VFo_bjh_k05RF3UHmCgUA4KU'
  const apiKey = 'AIzaSyCtesM7XsnxPu6Sax4L4kM2gs5jWLZRT4c'
  const rangeValues = 'A2:AZ100'
  const { data } = await Axios.get(`https://content-sheets.googleapis.com/v4/spreadsheets/${idSheets}/values/${rangeValues}?access_token=${apiKey}&key=${apiKey}`)
  // console.log(data.values)

  const products = data.values.map((row) => ({
    id: row[0],
    sku: row[1],
    title: row[2],
    priceUSD: parseFloat(row[3]),
    salePrice: row[4] && parseFloat(row[4]),
  }))

  writeDBFile('products', products)
  // data.values.forEach(async (row) => {
  //   const productSheet = {
  //     id: row[0],
  //     sku: row[1],
  //     title: row[2],
  //     priceUSD: parseFloat(row[3]),
  //     salePrice: row[4],
  //   }
  //   const productAmazon = await getProduct({ sku: productSheet.sku })
  //   console.log(productAmazon.price, productSheet.priceUSD)

  //   // if (productAmazon.available && productAmazon.price <= productSheet.priceUSD) {
  //   //   const product = {
  //   //     title: productSheet.title,
  //   //     priceRecommended: productSheet.priceUSD,
  //   //     priceAmazon: productAmazon.price,
  //   //     available: productAmazon.available
  //   //   }
  //   //   console.log('product', product)
  //   //   products.push(product)
  //   //   writeDBFile('products', products)
  //   // }

  //   writeDBFile('products', products)

  //   // await sleep(4000)
  // })


  // console.log('products', products)

  // return res.json(products)
} catch (e) {
  console.log(e.message)
  // res.status(500).json({ message: e.message })
}

// writeDBFile('product', product)