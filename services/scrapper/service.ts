import Axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_AMA_API_URL_PRODUCT;

export default Axios.create({
  baseURL
});