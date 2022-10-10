import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filter: 0,
  },
  reducers: {
    switchFilterState(state, action) {
      state.filter = action.payload;
    },
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice;
