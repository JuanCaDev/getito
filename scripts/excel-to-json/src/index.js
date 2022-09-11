const XLSX = require('xlsx');
const axios = require('axios');
const fs = require('fs');
const util = require('node:util');

const TOKEN = "APP_USR-1425564282392279-090722-c2ab8e868fa9200fa5b4deba76a6b4e5-166877629"

const USER_ID = "166877629"

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

const ExcelToJSON = () => {
  const excelModel = XLSX.readFile('C:\\Users\\juanc\\Documents\\Dev\\getito\\scripts\\excel-to-json\\model.xlsx')
  const excelProducts1 = XLSX.readFile('C:\\Users\\juanc\\Documents\\Dev\\getito\\scripts\\excel-to-json\\products1.xlsx')
  const excelProducts2 = XLSX.readFile('C:\\Users\\juanc\\Documents\\Dev\\getito\\scripts\\excel-to-json\\products2.xlsx')

  const nameSheetModel = excelModel.SheetNames;
  let dataModel = XLSX.utils.sheet_to_json(excelModel.Sheets[nameSheetModel[0]])
  const nameSheetProducts1 = excelProducts1.SheetNames;
  let dataProducts1 = XLSX.utils.sheet_to_json(excelProducts1.Sheets[nameSheetProducts1[0]])
  const nameSheetProducts2 = excelProducts2.SheetNames;
  let dataProducts2 = XLSX.utils.sheet_to_json(excelProducts2.Sheets[nameSheetProducts2[0]])

  const skus = dataModel.map((data) => data['Código del producto'])
  // console.log(skus)
  // console.log(dataProducts1[1])
  // data['Código del producto'] === 
    // dataProducts1.forEach((dataProduct) => {
    //   if (data['Código del producto'] === dataProduct['Código del producto']) {
    //     return {
    //       ...data,
          
    //     }
    //   }
    // })


  const MCOArrays = []
  const items = []

  const getMCOs = async () => {
    for (let i = 0; i < skus.length; i += 19) {
      try {
        const { data } = await axios.get(`https://api.mercadolibre.com/users/${USER_ID}/items/search?seller_sku=${skus.slice(i, i+19)}`, 
          {
            headers: {  
              'Authorization': `Bearer ${TOKEN}`
            }
          }
        )

        // await getItems(data.results)

        console.log(`GET getMCOs ${i} - ${data.results} - ${skus.slice(i, i+19)}`)
        MCOArrays.push(data.results)
      } catch (error) {
        console.error(error)
      }
      await timeout(3000)
    }
    // var file = fs.createWriteStream('array.txt');
    // file.on('error', function(err) { /* error handling */ });
    // MCOArrays.forEach(function(v) { file.write(v.join(', ') + '\n'); });
    // file.end();
    fs.writeFileSync(process.cwd() + '/MCOs.js', util.inspect(MCOArrays));
  }

  const getItems = async (ids) => {
    for (let i = 0; i < ids.length; i += 20) {
      try {
        const { data } = await axios.get(`https://api.mercadolibre.com/items?ids=${ids}&attributes=id,title,price,base_price,original_price,available_quantity,variations,seller_custom_field,attributes`, 
          {
            headers: {  
              'Authorization': `Bearer ${TOKEN}`
            }
          }
        )

        console.log(`GET ${i}`)
        data.forEach((item) => {
          const { body } = item

          if (body.variations.length > 1) {
            body.variations.forEach((variation) => {
              const sku = variation.seller_custom_field?.split("__")[0]
    
              const result = {
                ...body,
                sku: sku,
              }
    
              items.push(result)
              console.log(`GET getItems ${i} - Results: ${result}`)
            })
          } else {
            const sku = removeAccents(body.seller_custom_field?.split("__")[0] || "")
            const sku2 = body.attributes.filter((attribute) => attribute.id === "SELLER_SKU")[0]?.value_name
    
            const result = {
              ...body,
              sku: sku || sku2,
            }
    
            items.push(result)
            console.log(`GET getItems ${i} - Results: ${result}`)
          }
          
        })
      } catch (error) {
        console.error(error)
      }
      await timeout(3000)
    }
    console.log(items)
  }

  getMCOs()
  
  // const dataItem = axios.get(`/items/search?sku=${skus}`, 
  //   {
  //     headers: {  
  //       'Authorization': `Bearer ${TOKEN}`
  //     }
  //   }
  // )

  // console.log(dataItem)

  

  // dataModel.map((data) => {
  //   const dataItem = axios.get(`/items/search?sku=${skus}`, 
  //     {
  //       headers: {  
  //         'Authorization': `Bearer ${TOKEN}`
  //       }
  //     }
  //   )
  // })
}

ExcelToJSON();