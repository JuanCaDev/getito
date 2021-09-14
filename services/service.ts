import Axios from 'axios';

const baseURL = 'https://api.mercadolibre.com';

export default Axios.create({
  baseURL,
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'accept': 'application/json',
  }
});