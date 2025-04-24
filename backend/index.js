import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = 5000;

app.get('/api/crypto', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 20,
        page: 1,
        sparkline: false,
        price_change_percentage: '1h,24h,7d'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
