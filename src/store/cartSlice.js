import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { items: [], totalQuantity: 0, isChanged: false };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
      state.isChanged = false;
    },

    addToCart(state, action) {
      const newItem = action.payload;
      state.isChanged = true;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (existingItem) {
        existingItem.quantity++;
        existingItem.total = existingItem.total + existingItem.price;
      } else {
        state.items.push({
          key: newItem.id,
          id: newItem.id,
          total: newItem.price,
          title: newItem.title,
          description: newItem.description,
          price: newItem.price,
          quantity: 1,
        });
      }
    },
    removeFromCart(state, action) {
      state.isChanged = true;
      const id = action.payload;

      const existingItem = state.items.find((item) => item.id === id);

      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.total = existingItem.total - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
