import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currencySwitcher",
  initialState: {
    currency: 0,
    symbol: '',
  },
  reducers: {
    switchCurrencyState(state, action) {
      state.currency = action.payload;
    },
    currencySymbol(state, action) {
      state.symbol = action.payload;
    },
  },
});

export const currencyActions = currencySlice.actions;

export default currencySlice;
