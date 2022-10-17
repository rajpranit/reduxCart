import { createSlice } from "@reduxjs/toolkit";

const initialUiState = { isToggleCart: false, notification: null };

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    toggleCart(state) {
      state.isToggleCart = !state.isToggleCart;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
