import { CryptoAsset } from '../redux/cryptoSlice'

export const sampleCryptoData: CryptoAsset[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    current_price: 30000,
    price_change_percentage_1h_in_currency: 0.2,
    price_change_percentage_24h_in_currency: -1.1,
    price_change_percentage_7d_in_currency: 4.3,
    market_cap: 600000000000,
    total_volume: 25000000000,
    circulating_supply: 19000000,
    max_supply: 21000000,
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    current_price: 2000,
    price_change_percentage_1h_in_currency: 0.4,
    price_change_percentage_24h_in_currency: 2.1,
    price_change_percentage_7d_in_currency: 8.2,
    market_cap: 250000000000,
    total_volume: 15000000000,
    circulating_supply: 120000000,
    max_supply: 0,
  },
  // add 3 more if needed...
]
