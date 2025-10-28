import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import userReducer from './userSlice';
import apiReducer from './apiSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    api: apiReducer,
    // Diğer slice'lar buraya eklenir
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 