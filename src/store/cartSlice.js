import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { items: [], amount: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({
          title: newItem.title,
          description: newItem.description,
          price: newItem.price,
          quantity: newItem.quantity,
        });
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
