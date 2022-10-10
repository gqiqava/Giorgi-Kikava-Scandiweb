import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    opacity: false,
  },

  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.id === newItem.id &&
          JSON.stringify(item.attributes) === JSON.stringify(newItem.attributes)
      );

      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.prices,
          gallery: newItem.gallery,
          name: newItem.name,
          brand: newItem.brand,
          attributes: newItem.attributes,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
      }
    },

    removeItemFromCart(state, action) {
      const removingItem = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.id === removingItem.id &&
          JSON.stringify(item.attributes) ===
            JSON.stringify(removingItem.attributes)
      );
      state.totalQuantity--;

      // && item.id !== removingItem.id ---->

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(
          (item) =>
            JSON.stringify(item.attributes) !==
            JSON.stringify(removingItem.attributes)
        );
      } else {
        existingItem.quantity--;
      }
    },
    opacityStateHandler(state, action) {
      state.opacity = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
