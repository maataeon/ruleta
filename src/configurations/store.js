import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '../components/Items/itemsSlice';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});
