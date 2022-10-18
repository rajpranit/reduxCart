import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Layout from "./components/Layout/Layout";
import Notification from "./components/UI/notification";
import Products from "./components/Shop/Products";
import Cart from "./components/Cart/Cart";
import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.isToggleCart);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(
      fetchCartData({
        items: cart.items,
        totalAmount: cart.totalAmount,
      })
    );
  }, []);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.isChanged) {
      dispatch(sendCartData(cart));
    }
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
