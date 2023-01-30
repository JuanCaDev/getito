const axios = require('axios');
const fs = require('fs')
const { authorization, sellerId } = require("./env");
const { timeout } = require('./utils');

const arrayLength = 750;
const limit = 20
let MCOs = [];


const getData = async () => {
  for (let i = 0; i < arrayLength; i += limit) {
    const { data } = await axios.get(`https://api.mercadolibre.com/users/${sellerId}/items/search?limit=${limit}&offset=${i}`, {
      headers: {
        Authorization: authorization
      }
    })
    MCOs.push(data.results)
    await timeout(3000)
  }

  fs.writeFile('MCOs.json', JSON.stringify(MCOs), 'utf8', (err) => {
    if (err) console.log('err', err);
    console.log(`ARCHIVO CREADO. ${MCOs.length * 20} MOCs encontrados`);
  })
}

getData()
