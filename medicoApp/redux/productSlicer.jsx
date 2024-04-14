// idProdSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

export const idProdSlice = createSlice({
  name: 'idProd',
  initialState,
  reducers: {
    save: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { save } = idProdSlice.actions;

export default idProdSlice.reducer;
