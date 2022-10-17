import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Layout from "./components/Layout/Layout";
import Notification from "./components/UI/notification";
import Products from "./components/Shop/Products";
import Cart from "./components/Cart/Cart";
import { uiActions } from "./store/ui-slice";

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.isToggleCart);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const sendCart = async () => {
      if (isInitial) {
        isInitial = false;
        return;
      }
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Pending...",
          message: "Sending your request to cart",
        })
      );

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

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Your data was sent successfully",
        })
      );
    };
    sendCart().catch((error) =>
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "There was an error while sending data to the cart",
        })
      )
    );
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
