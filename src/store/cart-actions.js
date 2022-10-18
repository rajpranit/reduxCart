import { cartActions } from "./cartSlice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://reactcart-f83f8-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Your data was not fetched successfully");
      }

      const data = await response.json();
      dispatch(
        cartActions.replaceCart({
          items: data.items || [],
          totalQuantity: data.totalQuantity,
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
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
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
