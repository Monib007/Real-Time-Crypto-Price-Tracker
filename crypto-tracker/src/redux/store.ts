// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './cryptoSlice';

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer, // Add the crypto slice here
  },
});

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
