import { chromium } from 'playwright'

export async function getProduct({ sku = 'X0032V5O4R' } = { sku: '' }) {
  console.log(sku || 'no exist')
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(`https://www.amazon.com/dp/${sku}`, {
    waitUntil: 'domcontentloaded'
  })

  const product = await page.evaluate(() => {
    if (!document.querySelector('#productTitle')) {
      throw "SKU invalido: "; 
    }

    const parseUSD = (price) => {
      return parseFloat(parseFloat(price.replace(/[^\d.-]/g,'')).toFixed(2))
    }

    const p = {}
    p.title = document.querySelector('#productTitle').innerText
    const priceElements = document.querySelectorAll('#apex_desktop span.a-offscreen')
    
    if (priceElements.length > 0) {
      if (priceElements.length === 2) { // Si tiene promoción
        if (priceElements[0]) p.salePrice = parseUSD(priceElements[0].innerText);
        if (priceElements[1]) p.price = parseUSD(priceElements[1].innerText);
      } else {
        p.price = parseUSD(priceElements[0].innerText);
      }
      p.available = true
    } else { // Si no está dispnoible
      p.salePrice = 0
      p.price = 0
      p.available = false
    }

    return p
  })
  await browser.close()

  console.log('product', product)

  return product
}