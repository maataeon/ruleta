import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: []
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {}
});

export const { } = itemsSlice.actions;

export default itemsSlice.reducer;