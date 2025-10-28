import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './userSlice';
import productsReducer from './productsSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    // Diğer slice'lar buraya eklenir
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 