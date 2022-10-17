import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Layout from "./components/Layout/Layout";
import Notification from "./components/UI/notification";
import Products from "./components/Shop/Products";
import Cart from "./components/Cart/Cart";
import { sendCartData } from "./store/cartSlice";

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.isToggleCart);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCartData(cart));
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
