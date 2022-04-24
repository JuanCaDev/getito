import Axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_ML_API_URL;

export default Axios.create({
  baseURL,
  headers: {
    'content-type': 'application/json;charset=utf-8',
  }
});