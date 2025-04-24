import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api'

// Define the type for each crypto asset (same as before)
export type CryptoAsset = {
  id: string
  name: string
  symbol: string
  image: string
  current_price: number
  price_change_percentage_1h_in_currency: number
  price_change_percentage_24h_in_currency: number
  price_change_percentage_7d_in_currency: number
  market_cap: number
  total_volume: number
  circulating_supply: number
  max_supply: number
}

// Define the initial state structure
type CryptoState = {
  assets: CryptoAsset[]
}

// Initial state (empty assets)
const initialState: CryptoState = {
  assets: [],
}

// Create async thunk for fetching crypto data from CoinMarketCap
export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchCryptoData',
  async () => {
    const response = await api.get('', {
      params: {
        start: '1',
        limit: '5', // Limiting to the top 5 cryptocurrencies for now
        convert: 'USD',
      },
    })
    return response.data.data // This returns an array of assets
  }
)

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setAssets: (state, action: PayloadAction<CryptoAsset[]>) => {
      state.assets = action.payload
    },
    updateAsset: (state, action: PayloadAction<Partial<CryptoAsset> & { id: string }>) => {
      const index = state.assets.findIndex(asset => asset.id === action.payload.id)
      if (index !== -1) {
        state.assets[index] = { ...state.assets[index], ...action.payload }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        // Optionally set a loading state if needed
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.assets = action.payload.map((asset: any) => ({
          id: asset.id,
          name: asset.name,
          symbol: asset.symbol,
          image: asset.logo, // Image path, you may need to adjust based on response
          current_price: asset.quote.USD.price,
          price_change_percentage_1h_in_currency: asset.quote.USD.percent_change_1h,
          price_change_percentage_24h_in_currency: asset.quote.USD.percent_change_24h,
          price_change_percentage_7d_in_currency: asset.quote.USD.percent_change_7d,
          market_cap: asset.quote.USD.market_cap,
          total_volume: asset.quote.USD.volume_24h,
          circulating_supply: asset.circulating_supply,
          max_supply: asset.max_supply || null,
        }))
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        // Handle rejection, like setting an error message
      })
  },
})

export const { setAssets, updateAsset } = cryptoSlice.actions
export default cryptoSlice.reducer
