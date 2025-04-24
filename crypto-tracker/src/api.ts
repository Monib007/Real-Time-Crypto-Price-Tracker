import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  headers: {
    'X-CMC_PRO_API_KEY': '395291c5-0cd2-4405-8900-3f5636814bbd',  // Your API key here
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
