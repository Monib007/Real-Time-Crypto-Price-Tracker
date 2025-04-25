import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface CoinSummary {
  id: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
}

interface CoinDetails {
  id: string;
  name: string;
  symbol: string;
  image: {
    small: string;
  };
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
  prices: [number, number][];
}

interface CryptoState {
  coins: CoinSummary[] | null;
  coinDetails: CoinDetails | null;
  coinHistory: CoinHistory | null;
  coinListStatus: 'loading' | 'succeeded' | 'failed';
  coinDetailsStatus: 'loading' | 'succeeded' | 'failed';
  coinHistoryStatus: 'loading' | 'succeeded' | 'failed';
}

const initialState: CryptoState = {
  coins: null,
  coinDetails: null,
  coinHistory: null,
  coinListStatus: 'loading',
  coinDetailsStatus: 'loading',
  coinHistoryStatus: 'loading',
};

// Fetch list of coins (summary)
export const fetchCryptoData = createAsyncThunk<CoinSummary[], number>(
  'crypto/fetchCryptoData',
  async (page) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}`
    );
    return await response.json();
  }
);

// Fetch full coin details
export const fetchCoinDetails = createAsyncThunk<CoinDetails, string>(
  'crypto/fetchCoinDetails',
  async (coinId) => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    const data = await response.json();
    return data;
  }
);

// Fetch coin history for chart
export const fetchCoinHistory = createAsyncThunk<CoinHistory, string>(
  'crypto/fetchCoinHistory',
  async (coinId) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
    );
    const data = await response.json();
    return data;
  }
);

// Slice
const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // List
      .addCase(fetchCryptoData.pending, (state) => {
        state.coinListStatus = 'loading';
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.coinListStatus = 'succeeded';
        state.coins = action.payload;
      })
      .addCase(fetchCryptoData.rejected, (state) => {
        state.coinListStatus = 'failed';
        state.coins = null;
      })

      // Details
      .addCase(fetchCoinDetails.pending, (state) => {
        state.coinDetailsStatus = 'loading';
      })
      .addCase(fetchCoinDetails.fulfilled, (state, action) => {
        state.coinDetailsStatus = 'succeeded';
        state.coinDetails = action.payload;
      })
      .addCase(fetchCoinDetails.rejected, (state) => {
        state.coinDetailsStatus = 'failed';
        state.coinDetails = null;
      })

      // History
      .addCase(fetchCoinHistory.pending, (state) => {
        state.coinHistoryStatus = 'loading';
      })
      .addCase(fetchCoinHistory.fulfilled, (state, action) => {
        state.coinHistoryStatus = 'succeeded';
        state.coinHistory = action.payload;
      })
      .addCase(fetchCoinHistory.rejected, (state) => {
        state.coinHistoryStatus = 'failed';
        state.coinHistory = null;
      });
  },
});

export default cryptoSlice.reducer;
