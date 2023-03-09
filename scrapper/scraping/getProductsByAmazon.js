import productsDocs from './db/productsDocs.json' assert {type: 'json'}
import { getProduct } from "../ProductScrapperService.js"
import { writeDBFile } from "./db/index.js";

function sleep(t) {
  return new Promise(function(resolve) {
    setTimeout(resolve, t);
  });
};

let products = []
let promises = []

// console.log(productsDocs)

for (let i = 0; i < productsDocs.length; i++) {
  console.log('productsDocs[i]?.sku', productsDocs[i]?.sku)
  if (productsDocs[i]?.sku) {
    const productAmazon = await getProduct({ sku: productsDocs[i]?.sku })
    const product = {
      title: productsDocs[i].title,
      priceRecommended: productsDocs[i].priceUSD,
      priceAmazon: productAmazon.price,
      available: productAmazon.available
    }
    console.log('product', product)
    products.push(product)
  
    await sleep(5000)
  } else {
    console.log('productsDocs[i]?.sku', productsDocs[i]?.sku)
  }
}

writeDBFile('products', products)

// productsDocs.forEach(async (p) => {
//   promises.push(
//     getProduct({ sku: p.sku })
//       .then(async (productAmazon) => {
//         const product = {
//           title: p.title,
//           priceRecommended: p.priceUSD,
//           priceAmazon: productAmazon.price,
//           available: productAmazon.available
//         }
//         products.push(product)
//         await sleep(5000)
//       })
//       .catch((error) => console.log(error))
//   )
//   // const productAmazon = await getProduct({ sku: p.sku })
//   // console.log(productAmazon.price, p.priceUSD)

//   // const product = {
//   //   title: p.title,
//   //   priceRecommended: p.priceUSD,
//   //   priceAmazon: productAmazon.price,
//   //   available: productAmazon.available
//   // }
//   // console.log('product', product)
//   // products.push(product)
//   // if (productAmazon.available && productAmazon.price <= product.priceUSD) {
//   // }
  
//   // await sleep(5000)
// })

// Promise.all(promises).then(() => 
//     // self.resultingFunction(self.files)
//     writeDBFile('products3', products)
// );

