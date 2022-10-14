import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { items: [], totalQuantity: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({
          key: newItem.id,
          id: newItem.id,
          title: newItem.title,
          description: newItem.description,
          price: newItem.price,
          quantity: 1,
        });
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;

      const existingItem = state.items.find((item) => item.id === id);

      existingItem.quantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        state.totalQuantity--;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
