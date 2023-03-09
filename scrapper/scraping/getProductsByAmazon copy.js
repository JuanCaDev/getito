import productsDocs from './db/productsDocs.json' assert {type: 'json'}

console.log('productsDocs', productsDocs)

productsDocs.forEach(async (product) => {
  const productAmazon = await getProduct({ sku: product.sku })
  console.log(productAmazon.price, product.priceUSD)

  if (productAmazon.available && productAmazon.price <= product.priceUSD) {
    const product = {
      title: product.title,
      priceRecommended: product.priceUSD,
      priceAmazon: productAmazon.price,
      available: productAmazon.available
    }
    console.log('product', product)
    products.push(product)
    writeDBFile('products', products)
  }

  writeDBFile('products', products)

  // await sleep(4000)
})