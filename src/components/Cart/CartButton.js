import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";

import { uiActions } from "../../store/ui-slice";

const CartButton = (props) => {
  const cartItem = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  const cartToggleHandler = () => {
    dispatch(uiActions.toggleCart());
  };

  return (
    <button className={classes.button} onClick={cartToggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItem}</span>
    </button>
  );
};

export default CartButton;
