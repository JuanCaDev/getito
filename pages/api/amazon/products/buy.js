import ProductScrapperService from '@/services/scrapper/ProductScrapperService'
import Axios from 'axios'

const handler = async (req, res) => {
  function sleep(t) {
    return new Promise(function(resolve) {
      setTimeout(resolve, t);
    });
  };

  try {
    // const product = await ProductScrapperService.getProduct({ sku: req.query.id })
    const idSheets = process.env.NEXT_PUBLIC_SHEETS_ID
    const apiKey = process.env.NEXT_PUBLIC_SHEETS_API_KEY
    const rangeValues = process.env.NEXT_PUBLIC_SHEETS_RANGE
    const { data } = await Axios.get(`https://content-sheets.googleapis.com/v4/spreadsheets/${idSheets}/values/${rangeValues}?access_token=${apiKey}&key=${apiKey}`)

    let products = []
    data.values.forEach(async (row) => {
      const productSheet = {
        id: row[0],
        sku: row[1],
        title: row[2],
        priceUSD: row[3],
        salePrice: row[4],
      }
      const productAmazon = await ProductScrapperService.getProduct({ sku: productSheet.sku })
      console.log(productAmazon.price, parseFloat(productSheet.priceUSD))

      if (productAmazon.available && productAmazon.price <= parseFloat(productSheet.priceUSD)) {
        const product = {
          title: productSheet.title,
          priceUSD: productAmazon.price,
          buy: true
        }
        console.log('product', product)
        products.push(product)
      }
    })

    await sleep(20000)

    console.log('products', products)

    return res.json(products)
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ message: e.message })
  }
}

export default handler
