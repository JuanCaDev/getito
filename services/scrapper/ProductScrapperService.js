// import Service from './service'
// import Cookies from 'js-cookie'
import { chromium } from 'playwright'

export default {
  async getProduct({ sku = 'B07SJR6HL3' }) {
    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto(`${process.env.NEXT_PUBLIC_AMA_API_URL_PRODUCT}/${sku}`, {
      waitUntil: 'domcontentloaded'
    })
    const product = await page.evaluate(() => {
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

    return product
  }
}