const axios = require('axios');
const fs = require('fs');
const { authorization } = require('./env');
const { timeout, removeAccents } = require('./utils');

const XLSX = require('xlsx');

let items = []

const getSaleFeeAmount = async (price, categoryId) => {
  const { data } = await axios.get(`https://api.mercadolibre.com/sites/MCO/listing_prices/gold_special?price=${price}&category_id=${categoryId}`, {
    headers: {
      Authorization: authorization
    }
  })

  return data
}

const convertItems = async (items) => {
  let results = []

  items.forEach(async (item) => {
    const { body } = item

    const price = body.original_price || body.base_price || 0
    let salePrice;
    try {
      salePrice = await getSaleFeeAmount(price, body.category_id)
      await timeout(3000)
    } catch (e) {
      console.log(e)
    }

    const brand = body.attributes?.filter(item => item.id === "BRAND")[0]?.value_name
    const model = body.attributes?.filter(item => item.id === "MODEL")[0]?.value_name
  
    if (body.variation?.length > 1) {
      body.variations.forEach((variation) => {
        const sku = variation.seller_custom_field?.split("__")[0]
        const attributeCombination = variation.attribute_combinations[0]?.value_name
  
        const result = {
          id: body.id,
          sku: sku,
          titulo: `${body.title} - ${attributeCombination}`,
          precio: price,
          salePrice: salePrice,
          cantidad: body.available_quantity,
          marca: brand,
          modelo: model
        }
  
        results.push(result)
      })
    } else {
      const sku = removeAccents(body.seller_custom_field?.split("__")[0] || "")
      const sku2 = body.attributes?.filter((attribute) => attribute.id === "SELLER_SKU")[0]?.value_name
  
      const result = {
        id: body.id,
        sku: sku || sku2,
        titulo: body.title,
        precio: price,
        salePrice: salePrice,
        cantidad: body.available_quantity,
        marca: brand,
        modelo: model
      }
  
      results.push(result)
    }
  })

  return results
}

const convertJsonToExcel = (results) => {
  const workSheet = XLSX.utils.json_to_sheet(results);
  const workBook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workBook, workSheet, "publicaciones")
  // Generate buffer
  XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })

  // Binary string
  XLSX.write(workBook, { bookType: "xlsx", type: "binary" })

  XLSX.writeFile(workBook, "publicaciones.xlsx")
}


const getData = async () => {
  fs.readFile('./MCOs.json', 'utf8', async function readFileCallback(err, data) {
    if (err) console.log(err)
    else {
      const MCOs = JSON.parse(data)

      console.log('');
      console.log('');
      console.log('');
      console.log('');
      console.log('ENTRANDO AL SISTEMA...');
      
      for (let i = 0; i < MCOs.length; i++) {
        const { data } = await axios.get(`https://api.mercadolibre.com/items?ids=${MCOs[i]}`, {
          headers: {
            Authorization: authorization
          }
        })
      
        items.push(...data)
        
        if (i === 0) {
          console.log('Obteniendo datos del sistema...');
        } else if (i === 1) {
          console.log('Guardando datos en un excel...');
        } else {
          console.log('SISTEMA HACKEADO');
        }
    
        await timeout(3000)
      }

      const itemsPublications = await convertItems(items)

      convertJsonToExcel(itemsPublications)
      
      fs.writeFile('itemsPublications.json', JSON.stringify(items), 'utf8', (err) => {
        if (err) console.log('err', err);
        console.log(`ARCHIVO CREADO. ${items.length} publicaciones encontradas`);
      })
    }
  })

}

getData()