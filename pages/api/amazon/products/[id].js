import ProductScrapperService from '@/services/scrapper/ProductScrapperService'

const handler = async (req, res) => {
  try {
    const product = await ProductScrapperService.getProduct({ sku: req.query.id })

    return res.json(product)
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ message: e.message })
  }
}

export default handler
