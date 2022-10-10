import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./cart-slice";
import filterSlice from "./filter-slice";
import currencySlice from "./currency-slice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    filter: filterSlice.reducer,
    currency: currencySlice.reducer,
  },
});

export default store;
