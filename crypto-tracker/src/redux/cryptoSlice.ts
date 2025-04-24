// src/redux/cryptoSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface CoinDetails {
  id: string;
  name: string;
  symbol: string;
  image: { small: string };
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
  };
}

interface CoinHistory {
  prices: [number, number][]; // Array of [timestamp, price] pairs
}

interface CryptoState {
  coinDetails: CoinDetails | null;
  coinHistory: CoinHistory | null;
  status: 'loading' | 'succeeded' | 'failed';
  coins: CoinDetails[] | null;
}

const initialState: CryptoState = {
  coinDetails: null,
  coinHistory: null,
  status: 'loading',
  coins: null,
};

// Define the async thunk to fetch coin details
export const fetchCoinDetails = createAsyncThunk<CoinDetails, string>(
  'crypto/fetchCoinDetails',
  async (coinId: string) => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    const data = await response.json();
    return data;
  }
);

// Define the async thunk to fetch coin history (prices)
export const fetchCoinHistory = createAsyncThunk<CoinHistory, string>(
  'crypto/fetchCoinHistory',
  async (coinId: string) => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`);
    const data = await response.json();
    return data;
  }
);

// New async thunk for fetching multiple coins (e.g., top 10 by market cap)
export const fetchCryptoData = createAsyncThunk<CoinDetails[], void>(
  'crypto/fetchCryptoData',
  async () => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1`);
    const data = await response.json();
    return data;
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCoinDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coinDetails = action.payload;
      })
      .addCase(fetchCoinDetails.rejected, (state) => {
        state.status = 'failed';
        state.coinDetails = null;
      })
      .addCase(fetchCoinHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCoinHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coinHistory = action.payload;
      })
      .addCase(fetchCoinHistory.rejected, (state) => {
        state.status = 'failed';
        state.coinHistory = null;
      })
      .addCase(fetchCryptoData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coins = action.payload;
      })
      .addCase(fetchCryptoData.rejected, (state) => {
        state.status = 'failed';
        state.coins = null;
      });
  },
});

export default cryptoSlice.reducer;
