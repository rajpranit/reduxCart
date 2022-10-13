import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./cartSlice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: { cart: cartSlice.reducer, ui: uiSlice.reducer },
});

export default store;
