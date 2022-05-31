const crypto = require('crypto');
import fetch from 'node-fetch';

console.log(crypto)

const hash = crypto.createHash('sha256')
const finalHex = hash.update('hola').digest('hex')

console.log(finalHex)

const timestamp = new Date().toISOString()
const userId = 'CO5YUF0'
const version = '1.0'
const action = 'GetProducts'

const parameters = {
  'UserID': userId,
  'Version': version,
  'Action': action,
  'Format':'JSON',
  'Timestamp': timestamp
}

const encoded = []

for (const property in parameters) {
  encoded.push(`${encodeURIComponent(property)}=${encodeURIComponent(parameters[property])}`)
}

console.log('encoded', encoded)

const concatenated = encoded.join('&')

console.log('concatenated', concatenated)

// encodeURIComponent
const apikey = 'c40bd7a7995b0b10aaecf2aa9eae6b7a35daf5ea'

const signature = crypto.createHmac("sha256", apikey).update(concatenated).digest().toString('base64');

console.log('signature', signature)

fetch(`https://sellercenter-api.linio.com.co/?Action=GetProducts&Timestamp=${timestamp}&UserID=${userId}&Version=${version}&Signature=${signature}`)
  .then(response => response.json())
  .then(data => console.log('data', data))
  .catch((error) => console.error('error', error))
