import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

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

      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
      }
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "success",
        title: "Pending...",
        message: "Sending your request to cart",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://reactcart-f83f8-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Some errro occured");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Your data was sent successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "There was an error while sending data to the cart",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
