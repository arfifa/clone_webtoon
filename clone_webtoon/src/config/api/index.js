import Axios from 'axios';

export const basePATH = 'http://10.0.3.2:3004';

export const API = Axios.create({
  baseURL: 'http://10.0.3.2:3004/api/v1'
})