import axios from 'axios';

export const fetchCryptoPrices = async () => {
  const response = await axios.get('http://localhost:5000/api/crypto');
  return response.data.data;
};
