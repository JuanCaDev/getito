import { NextApiHandler } from 'next'

import puppeteer from 'puppeteer';

const handler = async (_, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://dolar.wilkinsonpc.com.co/divisas/dolar-diario.html');

    const numbers = await page.evaluate(() => {
      const numersSpan = document.querySelectorAll('.indicador_numero');
      const numbers = []

      numersSpan.forEach(span => {
        const newSpan = span.innerText.replace(/\D+/g, '');
        numbers.push(Number(newSpan))
        console.log(numbers)
      })
      return numbers
    });

    const result = {
      dolarToday: numbers[3],
      dolarYesterday: numbers[4],
    }

    await browser.close();

    return res.json({ message: 'ok', data: result });;
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
